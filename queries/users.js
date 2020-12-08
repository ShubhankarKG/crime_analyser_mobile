const pool = require("../db");

const users = {
  getUsers(req, res) {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 20;
    console.log(req.query)
    const offset = (page - 1) * limit;
    pool.query(
      "SELECT * FROM users ORDER BY id ASC LIMIT $2 OFFSET $1",
      [offset, limit],
      (err, results) => {
        if (err) {
          throw err;
        }
        res.status(200).json(results.rows);
      }
    );
  },

  getUserById(request, response) {
    const id = parseInt(request.params.id);

    pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  },

  getCount(req, res) {
    pool.query("SELECT COUNT(*) from users", (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results.rows);
    });
  },

  createUser(request, response) {
    var firstName = "";
    var lastName = "";
    const { email, gender, address, age } = request.body;
    if (request.body.firstName) firstName = request.body.firstName;
    if (request.body.lastName) lastName = request.body.lastName;
    const name = `${firstName} ${lastName}`;
    const intAge = parseInt(age);
    pool.query(
      "INSERT INTO users (name, email, gender, age, address) VALUES ($1, $2, $3, $4, $5)",
      [name, email, gender, intAge, address],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`User added with ID: ${results.insertId}`);
      }
    );
  },

  updateUser(request, response) {
    const id = parseInt(request.params.id);
    var firstName = "";
    var lastName = "";
    const { email, gender, address, age } = request.body;
    if (request.body.firstName) firstName = request.body.firstName;
    if (request.body.lastName) lastName = request.body.lastName;
    const name = `${firstName} ${lastName}`;
    const intAge = parseInt(age);

    pool.query(
      "UPDATE users SET name = $1, email = $2, age=$3, address=$4, gender=$5 WHERE id = $6",
      [name, email, intAge, address, gender, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(`User modified with ID: ${id}`);
      }
    );
  },

  deleteUser(request, response) {
    const id = parseInt(request.params.id);

    pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    });
  },
};

module.exports = users;
