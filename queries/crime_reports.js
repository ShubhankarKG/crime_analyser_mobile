const pool = require("../db");

const crime_reports = {
  getCrimeReports(req, res) {
    pool.query(
      "SELECT * FROM crime_reports ORDER BY crime_id ASC",
      (err, results) => {
        if (err) {
          throw err;
        }
        res.status(200).json(results.rows);
      }
    );
  },

  getCrimeReportsById(req, res) {
    const crime_id = parseInt(req.params.crime_id);

    pool.query(
      "SELECT * FROM crime_reports WHERE crime_id = $1",
      [crime_id],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.status(200).json(result.rows);
      }
    );
  },

  createCrimeReport(req, res) {
    const {
      name,
      spousename,
      contact,
      email,
      address,
      place_of_occurrence,
      latitude,
      longitude,
      offence_desc,
    } = req.body;
    pool.query(
      "INSERT INTO crime_reports (name, spousename, contact, email, address, place_of_occurrence, latlng, offence_desc) VALUES ($1, $2, $3, $4, $5, $6, POINT($8, $7), $9)",
      [
        name,
        spousename,
        contact,
        email,
        address,
        place_of_occurrence,
        latitude,
        longitude,
        offence_desc,
      ],
      (err, results) => {
        if (err) {
          throw err;
        }
        res.status(201).json({
          success: `Crime report added : ${results.rows}`,
        });
      }
    );
  },

  updateCrimeReport(req, res) {
    const crime_id = req.params.crime_id;
    const {
      name,
      spousename,
      contact,
      email,
      address,
      place_of_occurrence,
      latlng,
      offence_desc,
    } = req.body;
    pool.query(
      "UPDATE crime_reports SET name=$1, spousename=$2, contact=$3, email=$4, address=$5, place_of_occurrence=$6, latlng=$7, offence_desc=$8 WHERE crime_id=$9",
      [
        name,
        spousename,
        contact,
        email,
        address,
        place_of_occurrence,
        latlng,
        offence_desc,
        crime_id,
      ],
      (err, results) => {
        if (err) {
          throw err;
        }
        res.status(200).json({
          success: `Crime report updated with ID : ${crime_id}`,
        });
      }
    );
  },

  deleteCrimeReport(req, res) {
    const crime_id = req.params.crime_id;
    pool.query(
      "DELETE FROM crime_reports WHERE crime_id = $1",
      [crime_id],
      (err, results) => {
        if (err) throw err;
        res.status(204);
      }
    );
  },
};

module.exports = crime_reports;
