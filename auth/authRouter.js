const bcrypt = require("bcryptjs");

const User = require("../users/userModel");
const validateLogin = require("../middlewares/validateLogin");
const router = require("express").Router();

router.post("/register", (req, res) => {
  const user = req.body;

  // hash user's password
  const hash = bcrypt.hashSync(user.password, 8);

  // save hashed password to user object
  user.password = hash;

  User.addUser(user)

    .then(user => {
      if (user) {
        res.status(201).json({ user });
      } else {
        res
          .status(400)
          .json({ message: "Please provide username and password" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "server error", err });
    });
});

router.post("/login", validateLogin, (req, res) => {
  const userData = req.body;
  const { user } = req.session;
  if (userData) {
    res.status(200).json({ message: `welcome ${user.username}!` });
  } else {
    res.status(400).json({ message: "Please provide valid credentials" });
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res.status(500).json({
          message:
            "you can checkout any time you like, but you can never leave!!!!!"
        });
      } else {
        res.status(200).json({ message: "logged out" });
      }
    });
  } else {
    res.status(200).end();
  }
});

module.exports = router;
