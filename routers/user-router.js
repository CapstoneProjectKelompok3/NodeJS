import express from "express";
import { userLogin, userRegister } from "../controllers/user-controller.js";
import registerMiddleware from "../middleware/register-middleware.js";
import { loginValidation } from "../middleware/login-middleware.js";

const router = express.Router();

router.post("/register", registerMiddleware, userRegister);
router.post("/login", loginValidation, userLogin);

export default router;
