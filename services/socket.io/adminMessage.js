import { sendMessage } from "../../controllers/message-controller.js";

export default async (io, message) => {
  console.log("Pesan dari admin: ", message);

  // Kirim pesan ke semua pengguna
  await sendMessage({
    content: message.content,
    idroom: message.idroom,
    userid: message.iduser,
  });
  
  io.emit("userMenerima", message);
  io.emit("adminMenerima", message);
}