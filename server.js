require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");
const users = require("./queries/users");
const crime_reports = require("./queries/crime_reports");
const auth = require("./queries/auth");
const gdb = require("./queries/gdb");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.set("view engine", "ejs");

app.use(express.static("fir-scanner/build"));

app.get("/users", users.getUsers);
app.get("/users/count", users.getCount);
app.get("/users/:id", users.getUserById);
app.post("/users", users.createUser);
app.put("/users/:id", users.updateUser);
app.delete("/users/:id", users.deleteUser);

app.get("/crime_reports", crime_reports.getCrimeReports);
app.get("/crime_reports/:crime_id", crime_reports.getCrimeReportsById);
app.post("/crime_reports", crime_reports.createCrimeReport);
app.put("/crime_reports/:crime_id", crime_reports.updateCrimeReport);
app.delete("/crime_reports/:crime_id", crime_reports.deleteCrimeReport);

app.post("/register", auth.registerAuth);
app.post("/login", auth.loginAuth);
app.post("/verify", auth.verify);

app.get("/gdb", gdb.getData);
app.get("/gdb/location", gdb.getTableData);
app.post("/gdb/custom", gdb.getCustomData);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "fir-scanner/build/index.html"));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});