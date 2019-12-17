const router = require("express").Router();

const Users = require("./userModel");

const restricted = require("../auth/restricted");

router.get("/", restricted, (req, res) => {
  Users.getAll()
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "There are no users here" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "server error", err });
    });
});

module.exports = router;
