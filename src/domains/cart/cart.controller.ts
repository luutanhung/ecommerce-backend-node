import type { Request, Response } from "express";

import { BadRequestAppError } from "../../core/error/badRequestAppError.js";
import { OKResponse } from "../../core/response/ok.response.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import type { AccessTokenPayload } from "../access/types/access.types.js";

import type { AddProductToCartRequestBody } from "./validations/cart.validations.js";

import { sanitizeCart } from "./cart.sanitizer.js";
import { CartService } from "./cart.service.js";

export class CartController {
  /**
   * Add product to cart.
   */
  async addProductToCart(req: Request, res: Response) {
    const updatedCart = await CartService.addProductToCart({
      userId: (req.auth as AccessTokenPayload).uid,
      product: req.body as AddProductToCartRequestBody,
    });

    if (!updatedCart) {
      throw new BadRequestAppError({
        code: ResCode.CART_ADD_PRODUCT_TO_CART_FAILED,
      });
    }

    new OKResponse({
      code: ResCode.CART_ADD_PRODUCT_TO_CART_SUCCEEDED,
      data: sanitizeCart(updatedCart),
    }).send(req, res);
  }

  /**
   * Get cart state.
   */
  async findCart(req: Request, res: Response) {
    const cart = await CartService.findCart({
      userId: (req.auth as AccessTokenPayload).uid,
    });

    new OKResponse({
      code: ResCode.CART_FIND_SUCCEEDED,
      data: sanitizeCart(cart),
    }).send(req, res);
  }
}

export const cartController = new CartController();
