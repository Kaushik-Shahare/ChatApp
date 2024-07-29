const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const saltRounds = 10;

const signup = async (req, res) => {
  const { username, fullName, email, gender, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/gitl?username=${username}`;

    const result = await User.create({
      username: username,
      email: email,
      fullName: fullName,
      gender: gender === "male" ? boyProfilePic : girlProfilePic,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(201).json({ user: result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
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
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ user: existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { signup, signin };
