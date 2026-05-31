import { Router } from "express";

import { asyncWrapper } from "../../shared/helpers/asyncWrapper.js";
import { validateRequest } from "../../shared/middlewares/validateRequest.middleware.js";
import { authenticateAccessToken } from "../access/middlewares/access.middleware.js";

import {
  AddProductToCartRequestBodySchema,
  RemoveCartItemFromCartRequestBodySchema,
} from "./validations/cart.validations.js";

import { cartController } from "./cart.controller.js";

const router = Router();

router.use(authenticateAccessToken);

/**
 * Add product to cart.
 */
router.post(
  "/carts/add-product",
  validateRequest({
    body: AddProductToCartRequestBodySchema,
  }),
  asyncWrapper(cartController.addProductToCart),
);

/**
 * Remove a single cart item from cart.
 */
router.post(
  "/carts/remove-item",
  validateRequest({
    body: RemoveCartItemFromCartRequestBodySchema,
  }),
  asyncWrapper(cartController.removeCartItemFromCart),
);

/**
 * Find cart state.
 */
router.get("/carts/me", asyncWrapper(cartController.findCart));

export { router as cartRouter };
