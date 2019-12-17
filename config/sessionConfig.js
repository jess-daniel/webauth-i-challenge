const sessions = require("express-session");
const knexSessionStore = require("connect-session-knex")(sessions);
const knex = require("../data/dbConfig");

const sessionConfig = {
  // session storage options
  name: "cookie", // default would be sid
  secret: "keep it safe", // used for encryption (must be an env variable)
  saveUninitialized: true, // GDPR requires false
  resave: false, // IDK, look it up

  // how to store the session
  store: new knexSessionStore({
    knex, // imported from dbConfig
    createtable: true,
    clearInterval: 1000 * 60 * 10,
    tablename: "sessions",
    sidfieldname: "sid"
  }),
  // cookie options
  cookie: {
    maxAge: 1000 * 60 * 10, // 10 minutes in milliseconds, also env variable
    secure: false, // if false sent via http, if true sent via https
    httpOnly: true // if true JS cannot access cookie
  }
};

module.exports = sessionConfig;
