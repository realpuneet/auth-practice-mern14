const express = require("express");
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route")
const { urlencoded } = require("body-parser");

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

//create a middleware 
app.use((req, res, next) => {
    console.log("Request Method:", req.method);
    console.log("Request URL:", req.url);
    next();
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

module.exports = app;

