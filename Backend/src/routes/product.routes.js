import { Router } from "express";
const router = Router();
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { ProductModel } from "../models/Product.model.js";
import { createproduct, getSellerProducts, getAllProducts,getProductDetails,addVariant } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.js";
import { createProductValidator } from "../validator/product.validator.js";

/***
 * @route Post /create/products
 * @description create a new product
 * @access private (seller only)
*/
router.post("/create/products", authMiddleware, upload.array("images", 7), createProductValidator, createproduct)

/**
 * @route Get /products/seller
 * @description get  products of the authenticated seller
 * @access private 
 */
router.get("/products/seller", authMiddleware, getSellerProducts)

/*** 
 * @route Get /products
 * @description get all products
 * @access public 
 */
router.get("/products", getAllProducts)

/***
 * @route Get /products/:id
 * @description get product by Id
 * @access public 
 */
router.get("/details/:id", getProductDetails)

/***
 * @route Post /:productId/variants
 * @description add variant to the product
 * @access private (seller only)
 */
router.post("/:productId/variants", authMiddleware, upload.array("images", 7), addVariant)



export default router;
