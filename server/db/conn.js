// Loads the configuration from config.env to process.env
require('dotenv').config({ path: 'server/config.env' });

// setup connect
const { MongoClient } = require("mongodb");
const connectionString = process.env.ATLAS_URI;
console.log(connectionString)
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

// import
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("Database_API");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};