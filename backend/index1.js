const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Chat = require("./models/chat");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const SECRET_KEY = "secret";

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
try {
  mongoose.connect(
    "mongodb+srv://Kaushik:1231231234@cluster0.8cuhk3k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Connected to MongoDB");
} catch (error) {
  console.log("Error while connecting to MongoDB", error);
}

// Test
app.get("/", async (req, res) => {
  res.send("Hello world");
});

// Test
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await User.create({
      email: email,
      password: hashedPassword,
      username: username,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(201).json({ user: result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );
    res.status(200).json({ user: existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/chats", async (req, res) => {
  try {
    if (!req.query.participants) {
      return res
        .status(400)
        .json({ message: "Missing participants query parameter" });
    }

    const participants = req.query.participants.split(",");

    const chats = await Chat.find({
      participants: { $all: participants },
    });

    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3001);
