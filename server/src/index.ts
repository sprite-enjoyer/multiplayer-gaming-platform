import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

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
      if (!roomID) {
        callback(0, false);
        return;
      }
      const { length } = await io.in(roomID).fetchSockets();
      if ((length) === 2) {
        callback(length, false);
        return;
      }

      socket.join(roomID);
      callback(length, true);
    }
  );

  socket.on("send-score", (room: string, fullScoreStoreData) => {
    console.log("received score info, :", fullScoreStoreData);
    socket.broadcast.to(room).emit("receive-score", fullScoreStoreData);
  })

  socket.on("send-message", (message: any, room: string) => {
    console.log("received message: ", message);
    socket.broadcast.to(room).emit("receive-message", message);
  });
});

