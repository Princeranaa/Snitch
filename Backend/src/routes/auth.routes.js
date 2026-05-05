import { Router } from "express";
import { registerValidator } from "../validator/auth.validator.js";
import { register } from "../Controllers/auth.controller.js";
const router = Router();

/**
 * email
 * password
 * contact
 * fullname
 * role
 */
router.post("/register", registerValidator, register);

export default router;
