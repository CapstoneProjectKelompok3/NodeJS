import express from "express";
import {
  backupMessage,
  getMessage,
  getRoom,
  roomMessage,
  sendMessage,
} from "../controllers/message-controller.js";
import { verifyToken, verifyTokenAdmin } from "../middleware/verify-token.js";
const router = express.Router();

router.post("/newmessage", verifyToken, roomMessage);
router.get("/getroom", verifyTokenAdmin, getRoom);
router.get("/getmessage/:roomid", verifyToken, getMessage);
// router.post("/sendmessage/:roomid", verifyToken, sendMessage);
router.put("/backupmessage", backupMessage);

export default router;
