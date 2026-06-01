import type { Request, Response } from "express";

import { ShopService } from "../services/shop.service.js";

import type { ShopLean } from "../types/shop.types.js";

import { BadRequestAppError } from "../../../core/error/badRequestAppError.js";
import { CreatedResponse } from "../../../core/response/created.response.js";
import { OKResponse } from "../../../core/response/ok.response.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import type { AccessTokenPayload } from "../../access/types/access.types.js";
import type { UserDocument } from "../../access/types/user.types.js";
import { ShopMapper } from "../mappers/shop.mapper.js";
import type {
  ChangeCurrencyBody,
  RegisterShopRequestBody,
  ShopParams,
  UpdateShopInformationRequestBody,
  VerifyShopRequestBody,
} from "../validations/shop.validations.js";

export class ShopController {
  /**
   * Register a new shop.
   */
  async registerShop(req: Request, res: Response) {
    const registeredShop = await ShopService.registerShop({
      userId: (req.auth as AccessTokenPayload).uid,
      ...(req.body as RegisterShopRequestBody),
    });

    if (!registeredShop) {
      throw new BadRequestAppError({
        code: ResCode.SHOP_REGISTER_FAILED,
      });
    }

    new CreatedResponse({
      code: ResCode.SHOP_REGISTER_SUCCESS,
      data: ShopMapper.toPublic(registeredShop),
    }).send(req, res);
  }

  /**
   * Send verification email.
   */
  async sendVerificationEmail(req: Request, res: Response) {
    const ownedShop = req.ownedShop as ShopLean;

    if (ownedShop.isVerified) {
      throw new BadRequestAppError({
        code: ResCode.SHOP_ALREADY_VERIFIED,
      });
    }

    const currentUser = req.currentUser as UserDocument;

    await ShopService.queueShopVerificationEmail({
      userInfo: {
        userId: currentUser._id.toString(),
        email: currentUser.email,
        name: currentUser.name,
      },
      shopInfo: {
        shopId: ownedShop._id.toString(),
        name: ownedShop.name,
      },
    });

    new OKResponse({
      code: ResCode.SHOP_SEND_VERIFICATION_EMAIL_SUCCEEDED,
    }).send(req, res);
  }

  /**
   * Verify shop.
   */
  async verifyShop(req: Request, res: Response) {
    const token = (req.body as VerifyShopRequestBody).token;

    await ShopService.verifyShop({ token });

    new OKResponse({
      code: ResCode.SHOP_VERIFY_EMAIL_SUCCEEDED,
    }).send(req, res);
  }

  /**
   * Update shop information.
   */
  async updateShopInformation(req: Request, res: Response) {
    const updatedShop = await ShopService.updateShopInformation({
      shopId: (req.ownedShop as ShopLean)._id.toString(),
      ...(req.body as UpdateShopInformationRequestBody),
    });

    new OKResponse({
      code: ResCode.SHOP_UPDATE_INFORMATION_SUCCESS,
      data: ShopMapper.toPublic(updatedShop),
    }).send(req, res);
  }

  /**
   * Change currency.
   */
  async changeCurrency(req: Request, res: Response) {
    const shopId = (req.params as ShopParams).shopId;

    const updatedShop = await ShopService.changeCurrency({
      userId: (req.auth as AccessTokenPayload).uid,
      shopId,
      ...(req.body as ChangeCurrencyBody),
    });

    new OKResponse({
      code: ResCode.SHOP_CHANGE_CURRENCY_SUCCEEDED,
      data: ShopMapper.toPublic(updatedShop),
    }).send(req, res);
  }

  /**
   * Close shop.
   */
  async closeShop(req: Request, res: Response) {
    const shopId = (req.params as ShopParams).shopId;

    await ShopService.closeShop({
      shopId,
    });

    new OKResponse({
      code: ResCode.SHOP_CLOSE_SUCCEEDED,
    }).send(req, res);
  }
}

export const shopController = new ShopController();
