import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { USER_ROLE } from "../constants/user.constants.js";

import { Sessions } from "../models/session.model.js";
import { Users } from "../models/user.model.js";

import type {
  LoginInput,
  LogoutAllExceptCurrentInput,
  LogoutAllInput,
  LogoutPayload,
  QueueVerificationEmailInput,
  RefreshTokenInput,
  RefreshTokenPayload,
  RegisterInput,
  VerifyEmailInput,
  VerifyUserPayload,
} from "../types/access.types.js";
import type { UserDocument, UserLean } from "../types/user.types.js";

import { config } from "../../../configs/config.js";
import { AppError } from "../../../core/error/appError.js";
import { AuthenticationFailedAppError } from "../../../core/error/authenticationFailedAppError.js";
import { BadRequestAppError } from "../../../core/error/badRequestAppError.js";
import { NotFoundAppError } from "../../../core/error/notFoundAppError.js";
import { UnauthorizedAppError } from "../../../core/error/unauthorizedAppError.js";
import { emailQueue } from "../../../queues/email/email.queue.js";
import { EMAIL_JOB_NAME } from "../../../shared/constants/queue.constants.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import { toObjectId } from "../../../shared/utils/mongoose.utils.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyJSONWebToken,
} from "../../../shared/utils/token.utils.js";
import {
  NOTIFICATION_CONTENT,
  NOTIFICATION_STATUS,
  NOTIFICATION_TITLE,
  NOTIFICATION_TYPE,
} from "../../notifications/notification.constants.js";
import { NotificationService } from "../../notifications/notification.service.js";
import { UserMapper } from "../mappers/user.mapper.js";

import { SessionService } from "./session.service.js";

export class AccessService {
  /**
   * Registers a new user account.
   */
  static async register({ email, password }: RegisterInput): Promise<{
    user: ReturnType<typeof UserMapper.toAuthenticatedUser>;
  }> {
    const existingUser = await Users.findOne({ email }).lean();

    if (existingUser) {
      throw new AppError({
        code: ResCode.USER_ALREADY_EXISTS,
      });
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    // Register a new user account.
    const createdUser: UserDocument = await Users.create({
      email,
      hashedPassword: hashedPassword,
      roles: [USER_ROLE.CUSTOMER],
    });

    return {
      user: UserMapper.toAuthenticatedUser(createdUser.toObject()),
    };
  }

  /**
   * Send verification email to user's mail address.
   */
  static async queueVerificationEmail({
    userId,
  }: QueueVerificationEmailInput): Promise<void> {
    const foundUser = await Users.findOne({
      _id: toObjectId(userId),
    }).lean();

    if (!foundUser) {
      throw new NotFoundAppError({
        code: ResCode.USER_NOT_FOUND,
      });
    }

    const issuedNotification = await NotificationService.issueNotification({
      userId,
      type: NOTIFICATION_TYPE.ACCESS_VERIFY_EMAIL_SENT,
      title: NOTIFICATION_TITLE.ACCESS_VERIFY_EMAIL,
      content: NOTIFICATION_CONTENT.ACCESS_VERIFY_EMAIL,
      status: NOTIFICATION_STATUS.PENDING,
    });

    await emailQueue.add(
      EMAIL_JOB_NAME.ACCESS_SEND_VERIFICATION_EMAIL,
      {
        userId,
        email: foundUser.email,
        name: foundUser.name,
        notificationId: issuedNotification._id.toString(),
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 3000,
        },
        removeOnComplete: 100,
        removeOnFail: 100,
      },
    );
  }

  /**
   * Verify email.
   */
  static async verifyEmail({
    emailVerificationToken,
  }: VerifyEmailInput): Promise<UserLean> {
    const { userId } = await verifyJSONWebToken<VerifyUserPayload>({
      token: emailVerificationToken,
      secret: config.jwt.mailSecret,
      expiredCode: ResCode.ACCESS_EMAIL_VERIFICATION_TOKEN_EXPIRED,
      invalidCode: ResCode.ACCESS_EMAIL_VERIFICATION_TOKEN_INVALID,
    });

    const foundUser = await Users.findOne({ _id: toObjectId(userId) });
    if (!foundUser) {
      throw new NotFoundAppError({
        code: ResCode.USER_NOT_FOUND,
      });
    }

    if (foundUser.isVerified) {
      throw new BadRequestAppError({
        code: ResCode.USER_ALREADY_VERIFIED_EMAIL,
      });
    }

    foundUser.isVerified = true;
    await foundUser.save();

    return foundUser.toObject();
  }

  /**
   * Logins with user's payload.
   */
  static async login({ email, password, deviceId }: LoginInput): Promise<{
    user: ReturnType<typeof UserMapper.toAuthenticatedUser>;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  }> {
    // Find user registered with passed-in email.
    const user = await Users.findOne({ email })
      .select("+hashedPassword")
      .lean();

    if (!user) {
      throw new NotFoundAppError({
        code: ResCode.USER_NOT_FOUND,
      });
    }

    // Check if provided password is matched with stored password.
    const passwordIsMatched: boolean = await bcrypt.compare(
      password,
      user.hashedPassword,
    );

    if (!passwordIsMatched) {
      throw new AuthenticationFailedAppError();
    }

    /** Create session. */
    const { accessToken, refreshToken } = await SessionService.createSession({
      userId: user._id.toString(),
      deviceId,
    });

    return {
      user: UserMapper.toAuthenticatedUser(user),
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  /**
   * Verifies provided refresh token and generates a pair of tokens.
   *
   * @remarks
   * Ensures that refresh token is used exactly one time to generate a new pair of tokens.
   */
  static async refreshToken({ refreshToken }: RefreshTokenInput): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    /**
     * Decode only.
     */
    const decodedRefreshTokenPayload = jwt.decode(
      refreshToken,
    ) as RefreshTokenPayload | null;
    if (!decodedRefreshTokenPayload?.sid) {
      throw new UnauthorizedAppError();
    }

    const session = await Sessions.findById(
      decodedRefreshTokenPayload.sid,
    ).select("+publicKey +privateKey");

    if (!session) {
      throw new UnauthorizedAppError();
    }

    if (session.expiresAt < new Date()) {
      await Sessions.findByIdAndDelete(session._id);
      throw new UnauthorizedAppError();
    }

    const payload: RefreshTokenPayload = await verifyJSONWebToken({
      token: refreshToken,
      secret: session.privateKey,
      expiredCode: ResCode.REFRESH_TOKEN_EXPIRED,
      invalidCode: ResCode.REFRESH_TOKEN_INVALID,
    });

    if (payload.ver !== session.refreshTokenVersion) {
      // CRITICAL: Detected a user who has reused refresh token.
      throw new UnauthorizedAppError();
    }

    /**
     * Rotate refresh token.
     */
    session.refreshTokenVersion += 1;
    await session.save();

    const userId = session.user.toString();
    const deviceId = session.deviceId;

    const newAccessToken: string = await generateAccessToken(
      {
        uid: userId,
        did: deviceId,
        sid: session._id.toString(),
      },
      session.privateKey,
    );

    const newRefreshToken: string = await generateRefreshToken(
      {
        uid: userId,
        did: deviceId,
        sid: session._id.toString(),
        ver: session.refreshTokenVersion,
      },
      session.privateKey,
    );

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  /**
   * Logout from current device.
   */
  static async logoutOneSession({ sessionId }: LogoutPayload): Promise<void> {
    await Sessions.findByIdAndDelete(toObjectId(sessionId));
  }

  /**
   * Logout from all devices except current.
   */
  static async logoutAllExceptCurrent({
    userId,
    deviceId,
  }: LogoutAllExceptCurrentInput): Promise<void> {
    await Sessions.deleteMany({
      user: toObjectId(userId),
      deviceId: {
        $ne: deviceId,
      },
    });
  }

  /**
   * Logout all sessions.
   */
  static async logoutAll({ userId }: LogoutAllInput): Promise<void> {
    await Sessions.deleteMany({
      user: toObjectId(userId),
    });
  }
}
