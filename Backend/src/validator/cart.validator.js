import { body, param, validationResult } from "express-validator";

function validateRequest(req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      message: "Invalid Request",
      error: error.array(),
    });
  }
  next();
}

export const addToCartValidator = [
    param("productId").isMongoId().withMessage("Product Id is required"),
    param("variantId").optional().isMongoId().withMessage("Variant Id is required"),
    body("quantity").optional().isInt({min:1}).withMessage("Quantity must be a number"),
    validateRequest,
]