const db = require("../data/dbConfig");

const getAll = () => {
  return db("users");
};

const findBy = filter => {
  return db("users")
    .select("id", "username", "password")
    .where(filter)
    .first();
};

const findById = id => {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
};

const addUser = user => {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
};

module.exports = {
  addUser,
  findById,
  findBy,
  getAll
};
