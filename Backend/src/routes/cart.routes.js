import { Router } from "express";
import { authenticatedUser } from "../middlewares/auth.middleware.js";
import { addToCart, getCart, incrementCartQuantity } from "../controllers/cart.controller.js";
import { addToCartValidator, validateIncrementCartItemQuantity } from "../validator/cart.validator.js";

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


/**
 * @route Patch /api/cart/quantity/increment/:productId/:variantId
 * @description increment items quantity in cart by one 
 * @access Private
 * @argument productId - Id of Product to update
 * @argument variantId - Id of variant to update
 */
router.patch("/quantity/increment/:productId/:variantId", authenticatedUser, validateIncrementCartItemQuantity, incrementCartQuantity)

/**
 * @route Patch /api/cart/quantity/decrement/:productId/:variantId
 * @description decrement items quantity in cart by one 
 * @access Private
 * @argument productId - Id of Product to update
 * @argument variantId - Id of variant to update
 */
// router.patch("/quantity/decrement/:productId/:variantId", authenticatedUser, updateCart)

export default router;