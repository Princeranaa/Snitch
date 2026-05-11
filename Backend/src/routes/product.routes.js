import { Router } from "express";
const router = Router();
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { createproduct, getSellerProducts } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.js";
import { createProductValidator } from "../validator/product.validator.js";

/***
 * @route Post /create/products
 * @description create a new product
 * @access private (seller only)
*/
router.post("/create/products", authMiddleware, createProductValidator, upload.array("images", 7), createproduct)

/**
 * @route Get /products/seller
 * @description get  products of the authenticated seller
 * @access private 
 */
router.get("/products/seller", authMiddleware, getSellerProducts)

export default router;
