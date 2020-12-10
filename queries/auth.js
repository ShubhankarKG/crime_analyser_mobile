const bcrypt = require("bcrypt");
const pool = require("../db");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { sendNotificationToClient } = require("../notify");

let token = "";
//authorization
const auth = {
  async registerAuth(req, res) {
    const { email, name, password } = req.body;
    try {
      const authUser = await pool.query("SELECT * FROM auth WHERE email = $1", [
        email,
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
        email,
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
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err);
    }
  },

  getClientToken(req, res) {
    token = req.body.token;
    res.status(200).json({ token: "Accepted" });
  },

  async pushNotif(req, res) {
    const { latitude, longitude } = req.body;
    console.log(latitude, longitude);
    const result = await pool.query(
      "select distinct upper(location) from crime_stats where st_within(crime_stats.the_geom, st_buffer(st_geomfromtext('POINT(' || $1 || ' ' || $2 || ')', 4326), 0.4)) = TRUE order by upper(location) limit 10;",
      [parseFloat(longitude), parseFloat(latitude)]
    );
    try {
      if (result.rowCount > 3) {
        const tokens = [token];
        const notification = {
          body: "You are venturing close! Stay safe",
          title: "Crime Alert!",
        };

        sendNotificationToClient(tokens, notification);
        res.status(200).json({ data: result.rows });
        // const headers = {
        //   Authorization: `key=${process.env.SERVER_KEY}`,
        //   "Content-Type": "application/json",
        // };
        // axios
        //   .post("https://fcm.googleapis.com/fcm/send", JSON.stringify(body), {
        //     headers,
        //   })
        //   .then((response) => res.status(200).json({ data: result.rows }))
        //   .catch((err) => res.status(500).json({ error: err.toString() }));
      } else {
        res.status(200).json({ message: "Safe" });
      }
    } catch (err) {
      res.status(500).json({ error: err.toString() });
    }
  },
};

function jwtGenerator(auth_id) {
  const payload = {
    auth: {
      id: auth_id,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
}

module.exports = auth;
