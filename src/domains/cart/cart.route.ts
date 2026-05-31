import { Router } from "express";

import { asyncWrapper } from "../../shared/helpers/asyncWrapper.js";
import { validateRequest } from "../../shared/middlewares/validateRequest.middleware.js";
import { authenticateAccessToken } from "../access/middlewares/access.middleware.js";

import {
  AddProductToCartRequestBodySchema,
  RemoveProductFromCartRequestBodySchema,
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
 * Remove a single product from cart.
 */
router.post(
  "/carts/remove-product",
  validateRequest({
    body: RemoveProductFromCartRequestBodySchema,
  }),
  asyncWrapper(cartController.removeProductFromCart),
);

/**
 * Find cart state.
 */
router.get("/carts/me", asyncWrapper(cartController.findCart));

export { router as cartRouter };
