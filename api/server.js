const express = require("express");
const helmet = require("helmet");
const sessions = require("express-session");
const server = express();

// imports
const authRouter = require("../auth/authRouter");
const userRouter = require("../users/userRouter");

const sessionConfig = require("../config/sessionConfig");

// middlewares
server.use(helmet());
server.use(express.json());
server.use(sessions(sessionConfig));

// routes
server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);

module.exports = server;
