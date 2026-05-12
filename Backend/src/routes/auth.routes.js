import { Router } from "express";
import {
  loginValidator,
  registerValidator,
} from "../validator/auth.validator.js";
import { login, register, getMe } from "../Controllers/auth.controller.js";
import { authenticatedUser } from "../middlewares/auth.middleware.js";
const router = Router();

/**
 * email
 * password
 * contact
 * fullname
 * role
 */
router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);

router.get("/me", authenticatedUser, getMe);

export default router;
