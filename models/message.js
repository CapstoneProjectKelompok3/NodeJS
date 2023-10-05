import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  room: String,
  adminId: String,
  userId: String,
  message: Object,
});

const Message = mongoose.model("Message", messageSchema);

export { Message };
