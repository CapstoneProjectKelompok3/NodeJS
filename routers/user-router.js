import express from "express";
import { updateUser, deleteuser, userLogin, userRegister, verifyUser, fetchAllUser, detailsUser, updatePass } from "../controllers/user-controller.js";
import registerMiddleware from "../middleware/register-middleware.js";
import { loginValidation } from "../middleware/login-middleware.js";
import { verifyToken, verifyTokenAdmin } from "../middleware/verify-token.js";
import updateMiddleware from "../middleware/update-middleware.js";
import passChangeMidlleware from "../middleware/passChange-middleware.js";

const router = express.Router();

router.get('/', verifyTokenAdmin, fetchAllUser)
router.get('/:userId', verifyToken, detailsUser)
router.delete('/:userId', verifyTokenAdmin, deleteuser);
router.post("/register", registerMiddleware, userRegister);
router.post("/login", loginValidation, userLogin);
router.put('/update', [verifyToken, updateMiddleware], updateUser);
router.put('/changepass', [verifyToken, passChangeMidlleware], updatePass);
router.put('/verify/:userId', verifyTokenAdmin, verifyUser);

export default router;
