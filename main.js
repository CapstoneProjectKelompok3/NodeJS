import express from "express";
import cors from "cors";
import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import apiRouter from "./routers/api-router.js";
import mongoose from './config/mongoose.js'
import userMessage from "./services/socket.io/userMessage.js";
import adminMessage from "./services/socket.io/adminMessage.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://ecci.vercel.app",
  },
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(apiRouter);

(async () => {
  try {
    // connect to mongodb atlas
    await mongoose()

    io.on('connection', (socket) => {
      console.log("Client terhubung");

      // Menangani pesan dari pengguna ke admin
      socket.on('userMessage', async (message) => {
        return userMessage(io, message)
      })

      // Menangani pesan dari admin ke pengguna
      socket.on("adminMessage", async (message) => {
        return adminMessage(io, message)
      });

      socket.on("disconnect", () => {
        console.log("Client terputus");
      });
    }) 
  } catch (err) {
    console.error('error', err);
  }
})();

export default app;
