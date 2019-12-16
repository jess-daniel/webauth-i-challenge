const express = require("express");
const helmet = require("helmet");

const server = express();

// imports

// middlewares
server.use(helmet());
server.use(express.json());

// routes

module.exports = server;
