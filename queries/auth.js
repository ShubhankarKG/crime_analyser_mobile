const bcrypt = require("bcrypt");
const pool = require("../db");
const jwt = require("jsonwebtoken");

//authorization
const auth = {
  async registerAuth(req, res) {
    const { email, name, password } = req.body;;
    try {
      const authUser = await pool.query("SELECT * FROM auth WHERE email = $1", [
        email
      ]);

      if (authUser.rows.length > 0) {
        return res.status(401).json("User already exist!");
      }

      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);

      let newAuthUser = await pool.query(
        "INSERT INTO auth (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, bcryptPassword]
      );

      const jwtToken = jwtGenerator(newAuthUser.rows[0].auth_id);

      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ err: "Server error" });
    }
  },

  async loginAuth(req, res) {
    const { email, password } = req.body;
    try {
      const auth = await pool.query("SELECT * FROM auth WHERE email = $1", [
        email
      ]);

      if (auth.rows.length === 0) {
        return res.status(401).json({ err: "Invalid Credential" });
      }
      console.log("Here");
      const validPassword = await bcrypt.compare(
        password,
        auth.rows[0].password
      );

      if (!validPassword) {
        return res.status(401).json({ err: "Invalid Credential" });
      }
      const jwtToken = jwtGenerator(auth.rows[0].auth_id);
      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ err: "Server error" });
    }
  },

  verify(req, res) {
    const token = req.header("jwt_token");
    // return if there is no token
    if (!token) {
      return res.status(403).json({ msg: "authorization denied" });
    }
    try {
      // Verify token
      try {
        //it is going to give the user id (user:{id: user.id})
        const verify = jwt.verify(token, process.env.jwtSecret);

        req.auth = verify.auth;
        res.json({ status: true });
      } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
      }
    }
    catch (err) {
      console.error(err.message);
      res.status(500).send(err);
    }

  }
}

function jwtGenerator(auth_id) {
  const payload = {
    auth: {
      id: auth_id
    }
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 })
}

module.exports = auth;