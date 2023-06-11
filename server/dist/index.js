"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
const PORT = 3000;
server.listen(PORT, () => {
    console.log("express server started at port: " + PORT + "!");
});
io.on("connection", (socket) => {
    console.log("connected: ", socket.id);
    socket.on("disconnecting", (reason) => {
        console.log("socket disconnected, reason: ", reason);
    });
    socket.on("join-room", async (roomID, callback) => {
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
    });
    socket.on("send-score", (room, fullScoreStoreData) => {
        console.log("received score info, :", fullScoreStoreData);
        socket.broadcast.to(room).emit("receive-score", fullScoreStoreData);
    });
    socket.on("send-message", (message, room) => {
        console.log("received message: ", message);
        socket.broadcast.to(room).emit("receive-message", message);
    });
});
