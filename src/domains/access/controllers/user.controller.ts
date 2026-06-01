import type { Request, Response } from "express";

import { UserService } from "../services/user.service.js";

import type { AccessTokenPayload } from "../types/access.types.js";

import { OKResponse } from "../../../core/response/ok.response.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import { UserMapper } from "../mappers/user.mapper.js";
import type { AddAddressBody } from "../validations/user.validations.js";

export class UserController {
  async addAddress(req: Request, res: Response) {
    const updatedUser = await UserService.addAddress({
      userId: (req.auth as AccessTokenPayload).uid,
      ...(req.body as AddAddressBody),
    });

    new OKResponse({
      code: ResCode.USER_ADD_ADDRESS_SUCCESS,
      data: UserMapper.toProfile(updatedUser),
    }).send(req, res);
  }
}

export const userController = new UserController();
