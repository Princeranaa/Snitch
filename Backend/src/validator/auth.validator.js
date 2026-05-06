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

export const registerValidator = [
  body("email").isEmail().withMessage("invalid Email"),
  body("contact")
    .notEmpty()
    .withMessage("Contact is required")
    .matches(/^\d{10}$/)
    .withMessage("Contact must be exactly 10 digits"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
  body("fullname").notEmpty().withMessage("Fullname is required"),
  body("isSeller").isBoolean().withMessage("seller much be a boolean values"),

  validateRequest,
];

export const loginValidator = [
  body("email").isEmail().withMessage("invalid Email"),
  body("password").notEmpty().withMessage().withMessage("Password is required"),
];
