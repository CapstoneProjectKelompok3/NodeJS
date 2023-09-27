import express from "express";
import { userLogin, userRegister } from "../controllers/user-controller.js";
import registerMiddleware from "../middleware/register-middleware.js";
import loginMiddleware from "../middleware/login-middleware.js";

const router = express.Router();

router.post("/", registerMiddleware, userRegister);
router.post("/login", loginMiddleware, userLogin);

export default router;
