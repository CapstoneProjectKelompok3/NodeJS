import express from "express";
import { updateUser, deleteuser, userLogin, userRegister, verifyUser, getUser } from "../controllers/user-controller.js";
import registerMiddleware from "../middleware/register-middleware.js";
import { loginValidation } from "../middleware/login-middleware.js";
import { verifyToken, verifyTokenAdmin } from "../middleware/verify-token.js";
import updateMiddleware from "../middleware/update-middleware.js";

const router = express.Router();

router.get('/', verifyTokenAdmin, getUser)
router.post("/register", registerMiddleware, userRegister);
router.post("/login", loginValidation, userLogin);
router.put('/verify/:userId', verifyTokenAdmin, verifyUser);
router.put('/update/', [verifyToken, updateMiddleware], updateUser);
router.delete('/:userId', verifyTokenAdmin, deleteuser);

export default router;
