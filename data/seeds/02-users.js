exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "Bob", password: "password1" },
        { username: "George", password: "password2" },
        { username: "John", password: "password3" }
      ]);
    });
};
