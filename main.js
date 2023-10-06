import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import apiRouter from "./routers/api-router.js";
import http from "http";
import { sendMessage } from "./controllers/message-controller.js";
import { Server } from "socket.io";

const app = express();
export let server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://ecci.vercel.app",
  },
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(apiRouter);

// Koneksi ke MongoDB
(async () => {
  await mongoose
    .connect(
      "mongodb+srv://capstone01:capstone01@capstone.t8xs3op.mongodb.net/ecci",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Koneksi MongoDB berhasil!");

      // Menangani koneksi socket
      io.on("connection", (socket) => {
        console.log("Client terhubung");

        // Menangani pesan dari pengguna ke admin
        socket.on("userMessage", async (message) => {
          console.log("Pesan dari pengguna: ", message);
          // Kirim pesan ke semua admin
          await sendMessage({
            content: message.content,
            idroom: message.idroom,
            userid: message.iduser,
          });
          io.emit("userMenerima", message);
          io.emit("adminMenerima", message);
        });

        // Menangani pesan dari admin ke pengguna
        socket.on("adminMessage", async (message) => {
          console.log("Pesan dari admin: ", message);
          // Kirim pesan ke semua pengguna
          await sendMessage({
            content: message.content,
            idroom: message.idroom,
            userid: message.iduser,
          });
          io.emit("userMenerima", message);
          io.emit("adminMenerima", message);
        });

        socket.on("disconnect", () => {
          console.log("Client terputus");
        });
      });

      // server.listen(process.env.SERVER_PORT, () => {
      //   console.log(`server started on port ${process.env.SERVER_PORT}`);
      // });
    })
    .catch((err) => {
      console.error("Koneksi MongoDB gagal: " + err);
    });
})();
export default app;
