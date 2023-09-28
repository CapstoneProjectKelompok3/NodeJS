import express from "express";
import { userLogin, userRegister } from "../controllers/user-controller.js";
import registerMiddleware from "../middleware/register-middleware.js";
import { verifyTokenAdmin } from "../middleware/verify-token.js";

const router = express.Router();

router.post("/register", verifyTokenAdmin, registerMiddleware, userRegister);
router.post("/login", userLogin);

export default router;
