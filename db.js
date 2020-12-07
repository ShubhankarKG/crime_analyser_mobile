const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USER,
  host: "localhost",
  database: process.env.USER,
  password: process.env.PASSWORD,
  port: 5432,
});

module.exports = pool;