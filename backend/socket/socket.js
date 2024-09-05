const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // Emit online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle initiating a call
  socket.on("callUser", ({ userToCall, signalData, from }) => {
    const socketId = getReceiverSocketId(userToCall);
    if (socketId) {
      io.to(socketId).emit("callUser", { signal: signalData, from });
    }
  });

  // Handle answering a call
  socket.on("answerCall", ({ to, signal }) => {
    const socketId = getReceiverSocketId(to);
    if (socketId) {
      io.to(socketId).emit("callAccepted", signal);
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { app, getReceiverSocketId, io };
