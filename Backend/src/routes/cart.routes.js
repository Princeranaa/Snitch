import { Router } from "express";
import { authenticatedUser } from "../middlewares/auth.middleware.js";
import { addToCart, getCart } from "../controllers/cart.controller.js";
import { addToCartValidator } from "../validator/cart.validator.js";

const router = Router();

/**
 * @route POST /api/cart/add/:productId/:variantId
 * @description Adding products to cart
 * @access Private
 * @argument productId - Id of Product
 * @argument variantId - Id of variant
 * @argument quantity - Quantity of item to add (optional, default: 1)
 */
router.post("/add/:productId/:variantId", authenticatedUser, addToCartValidator, addToCart);

/**
 * @route GET /api/cart
 * @description Getting products from cart
 * @access Private
 */
router.get("/", authenticatedUser, getCart)


export default router;