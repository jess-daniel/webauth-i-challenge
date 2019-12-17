const restricted = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "You are not logged in" });
  }
};

module.exports = restricted;
