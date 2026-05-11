import { body, validationResult } from "express-validator";

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

export const createProductValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("priceamount").notEmpty().withMessage("Price amount is required"),
  body("priceCurrency").notEmpty().withMessage("Price currency is required"),

  validateRequest,
];
