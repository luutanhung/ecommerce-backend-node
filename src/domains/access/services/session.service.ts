import { REFRESH_TOKEN_EXPIRES_IN_DAYS } from "../constants/access.constants.js";

import { Sessions } from "../models/session.model.js";

import type {
  AccessTokenPayload,
  RefreshTokenPayload,
} from "../types/access.types.js";
import type { CreateSessionInput } from "./types/session.service.types.js";

import type { KeyPair } from "../../../shared/types/utils.type.js";
import { createKeyPair } from "../../../shared/utils/generator.utils.js";
import { toObjectId } from "../../../shared/utils/mongoose.utils.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../shared/utils/token.utils.js";

export class SessionService {
  /**
   * Initiate a new session for user's device.
   */
  static async createSession({
    userId,
    deviceId,
  }: CreateSessionInput): Promise<{
    sessionId: string;
    accessToken: string;
    refreshToken: string;
  }> {
    /**
     * Remove existing session for this device.
     */
    await Sessions.deleteOne({
      sessionUser: toObjectId(userId),
      sessionDeviceId: deviceId,
    });

    const { privateKey, publicKey }: KeyPair = await createKeyPair();

    const refreshTokenVersion: number = 1;

    const session = await Sessions.create({
      sessionUser: userId,
      sessionDeviceId: deviceId,
      refreshTokenVersion,
      privateKey,
      publicKey,
      expiresAt: new Date(
        Date.now() + REFRESH_TOKEN_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000,
      ),
    });

    const sessionId: string = session._id.toString();

    const accessTokenPayload: AccessTokenPayload = {
      uid: userId,
      did: deviceId,
      sid: sessionId,
    };

    const refreshTokenPayload: RefreshTokenPayload = {
      uid: userId,
      did: deviceId,
      sid: sessionId,
      ver: refreshTokenVersion,
    };

    const accessToken: string = await generateAccessToken(
      accessTokenPayload,
      publicKey,
    );
    const refreshToken: string = await generateRefreshToken(
      refreshTokenPayload,
      privateKey,
    );

    return {
      sessionId,
      accessToken,
      refreshToken,
    };
  }
}
