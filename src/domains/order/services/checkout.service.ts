import type { CheckoutOrderInput } from "./types/checkout.service.types.js";

import { NotFoundAppError } from "../../../core/error/notFoundAppError.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import { toObjectId } from "../../../shared/utils/mongoose.utils.js";
import { CART_STATE } from "../../cart/cart.contants.js";
import { Carts } from "../../cart/models/cart.model.js";

export class CheckoutService {
  static async checkoutOrder({ userId, cartId }: CheckoutOrderInput) {
    const cart = await Carts.findOne({
      _id: toObjectId(cartId),
      user: toObjectId(userId),
      state: CART_STATE.ACTIVE,
    });

    if (!cart) {
      throw new NotFoundAppError({
        code: ResCode.CART_NOT_FOUND,
      });
    }

    return cart;
  }
}
