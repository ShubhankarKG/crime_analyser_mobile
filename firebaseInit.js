const admin = require("firebase-admin");

const { googleApplicationCredentials } = require("./constants");

const serviceAccount = require(googleApplicationCredentials);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "your-database-url-here",
});

module.exports = {
  messaging: admin.messaging(),
};
