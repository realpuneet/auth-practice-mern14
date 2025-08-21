const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

async function register(req, res) {
  const { email, password } = req.body;

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ msg: "user is already exists!" });
  }
  const user = await userModel.create({
    email,
    password,
  });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET
  );

  res.status(201).json({ msg: "user registered!", user, token });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    res.status(404).json({
      message: " User not found ",
    });
  }

  const isPasswordValid = password === user.password;

  if (!isPasswordValid) {
    res.status(401).json({
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(200).json({
    message: " User logged In Successfully.",
    user,
  });
}

module.exports = { register, login };
