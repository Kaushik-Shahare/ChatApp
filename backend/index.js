const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const chatsRouter = require("./routes/chatsRoutes");
const userRouter = require("./routes/userRoutes");
const http = require("http");
const socketIo = require("socket.io");
const dotenv = require("dotenv");

const saltRounds = 10;
const SECRET_KEY = process.env.SECRET_KEY;

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
server = http.createServer(app);
// const io = socketIo(server);

try {
  mongoose.connect(process.env.MONGO_DB_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log("Error while connecting to MongoDB", error);
}

app.use("/auth", authRouter);

app.use("/chats", chatsRouter);

app.use("/users", userRouter);

server.listen(3001, () => {
  console.log("listening on *:3001");
});
