import express from "express";
import { userLogin, userRegister, verifyUser } from "../controllers/user-controller.js";
import registerMiddleware from "../middleware/register-middleware.js";
import { loginValidation } from "../middleware/login-middleware.js";
import { verifyTokenAdmin } from "../middleware/verify-token.js";

const router = express.Router();

router.post("/register", registerMiddleware, userRegister);
router.post("/login", loginValidation, userLogin);
router.put('/verify/:userId', verifyTokenAdmin, verifyUser)

export default router;
