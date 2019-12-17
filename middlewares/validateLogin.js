const bcrypt = require("bcryptjs");

const Users = require("../users/userModel");

const validateCredentials = (req, res, next) => {
  const { username, password } = req.body;
  req.user = req.body;
  Users.findBy({ username }).then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      next();
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  });
};

module.exports = validateCredentials;
