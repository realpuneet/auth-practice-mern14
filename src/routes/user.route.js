const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

router.get("/profile", async (req, res) => {
  const { token } = req.body || {};

  if (!token) {
    return res.status(401).json({
      message: " Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({
      _id: decoded.id,
    });

    res.status(200).json({
      message: " User fetched successfully ",
      user,
    });
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
});

module.exports = router;
