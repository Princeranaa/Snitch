import { Router } from "express";
const router = Router();
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { createproduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.js";
import { createProductValidator } from "../validator/product.validator.js";


router.post("/products", authMiddleware, createProductValidator, upload.array("images", 7), createproduct)




export default router;
