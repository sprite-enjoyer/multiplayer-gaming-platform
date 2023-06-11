import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import http from "http";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log("express server started at port: " + PORT + "!");
});

io.on("connection", (socket) => {
  console.log("connected: ", socket.id)


  socket.on("disconnecting", (reason) => {
    console.log("socket disconnected, reason: ", reason);
  })

  socket.on(
    "join-room",
    async (roomID: string | undefined, callback: (length: number, success: boolean) => void) => {
      console.log(roomID, ": roomID");
      if (!roomID) {
        callback(0, false);
        console.log("room id is undefined!");
        return;
      }
      const { length } = await io.in(roomID).fetchSockets();
      console.log(length, ": length!")
      if ((length) === 2) {
        callback(length, false);
        return;
      }

      socket.join(roomID);
      callback(length, true);
    }
  );

  socket.on("send-message", (message: any, room: string) => {
    console.log("received message: ", message);
    socket.broadcast.to(room).emit("receive-message", message);
  });
});
