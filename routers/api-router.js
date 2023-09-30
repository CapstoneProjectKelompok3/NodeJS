import express from "express";
import userRouter from "./user-router.js";
import feedbackRouter from "./feedback-router.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json" assert { type: "json" };

const router = express.Router();

router.use("/users", userRouter);
router.use("/feedback", feedbackRouter);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
