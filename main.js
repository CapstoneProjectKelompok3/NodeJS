import express from 'express'
import cors from 'cors'
import apiRouter from './routers/api-router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use(apiRouter)

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

export default app