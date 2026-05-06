import { Router } from "express";
import { loginValidator, registerValidator } from "../validator/auth.validator.js";
import { login, register } from "../Controllers/auth.controller.js";
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

export default router;
