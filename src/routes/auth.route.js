const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/user", (req, res) => {
  res.status(200).json({ msg: "user router working" });
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body

  const existingUser = await userModel.find({ email });

  if (!existingUser) {
    return res.status(400).json({ msg: "user is already exists!" });
  }

  const user = await userModel.create({
    email,
    password,
  });

  const token = jwt.sign({user: user._id, email}, process.env.JWT_SECRET);

  res.status(201).json({ msg: "user registered!", user , token});

});

module.exports = router;
