"use strict";

const { Client } = require("pg");
const { getDatabaseUri } = require("./config");
const { CLIENT_PASSWORD } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false
    }
  });
}else {
  db = new Client({
    database: 'capstone2',
    password: CLIENT_PASSWORD
  });
}

db.connect();

module.exports = db;