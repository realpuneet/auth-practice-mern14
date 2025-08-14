const express = require("express");
const authRouter = require("./routes/auth.route");
const { urlencoded } = require("body-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/auth", authRouter);

module.exports = app;