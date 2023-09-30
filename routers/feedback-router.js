import { userFeedback } from "../controllers/feedback-controller.js";
import express from "express";
import { verifyToken } from "../middleware/verify-token.js";
import { createFeedBackValidation } from "../middleware/feedback-middleware.js";
const router = express.Router();

router.post("/:userId", verifyToken, createFeedBackValidation, userFeedback);

export default router;
