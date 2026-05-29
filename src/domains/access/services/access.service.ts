import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserRole } from "../constants/access.constants.js";

import { Sessions } from "../models/session.model.js";
import { Users } from "../models/user.model.js";

import type {
  LoginInput,
  LogoutAllExceptCurrentInput,
  LogoutAllSessionsInput,
  LogoutPayload,
  RefreshTokenInput,
  RefreshTokenPayload,
  RegisterInput,
  UserDocument,
} from "../types/access.type.js";

import { AppError } from "../../../core/error/appError.js";
import { AuthenticationFailedAppError } from "../../../core/error/authenticationFailedAppError.js";
import { NotFoundAppError } from "../../../core/error/notFoundAppError.js";
import { UnauthorizedAppError } from "../../../core/error/unauthorizedAppError.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import { toObjectId } from "../../../shared/utils/mongoose.utils.js";
import { sanitizeUser } from "../../../shared/utils/sanitizer.utils.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyJSONWebToken,
} from "../../../shared/utils/token.utils.js";

import { SessionService } from "./session.service.js";

export class AccessService {
  /**
   * Registers a new user account.
   */
  static async register({ email, password }: RegisterInput): Promise<{
    user: ReturnType<typeof sanitizeUser>;
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
      roles: [UserRole.CUSTOMER],
    });

    return {
      user: sanitizeUser(createdUser),
    };
  }

  /**
   * Logins with user's payload.
   */
  static async login({ email, password, deviceId }: LoginInput): Promise<{
    user: ReturnType<typeof sanitizeUser>;
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
      user,
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
    const verifyRefreshToken = async (
      refreshToken: string,
      privateKey: string,
    ): Promise<RefreshTokenPayload> => {
      try {
        const refreshAuthPayload =
          await verifyJSONWebToken<RefreshTokenPayload>(
            refreshToken,
            privateKey,
          );
        return refreshAuthPayload;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err instanceof jwt.TokenExpiredError) {
          throw new UnauthorizedAppError({
            code: ResCode.REFRESH_TOKEN_EXPIRED,
          });
        } else if (err instanceof jwt.JsonWebTokenError) {
          throw new UnauthorizedAppError({
            code: ResCode.REFRESH_TOKEN_INVALID,
          });
        }

        throw err;
      }
    };

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

    const payload: RefreshTokenPayload = await verifyRefreshToken(
      refreshToken,
      session.privateKey,
    );

    if (payload.ver !== session.refreshTokenVersion) {
      // CRITICAL: Detected a user who has reused refresh token.
      throw new UnauthorizedAppError();
    }

    /**
     * Rotate refresh token.
     */
    session.refreshTokenVersion += 1;
    await session.save();

    const userId = session.sessionUser.toString();
    const deviceId = session.sessionDeviceId;

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
  static async logoutAllSessionsExceptCurrent({
    userId,
    deviceId,
  }: LogoutAllExceptCurrentInput): Promise<void> {
    await Sessions.deleteMany({
      sessionUser: toObjectId(userId),
      sessionDeviceId: {
        $ne: deviceId,
      },
    });
  }

  /**
   * Logout all sessions.
   */
  static async logoutAllSessions({
    userId,
  }: LogoutAllSessionsInput): Promise<void> {
    await Sessions.deleteMany({
      sessionUser: toObjectId(userId),
    });
  }
}
