"use strict";
const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const User = require("../models/user");
const Meals = require("../models/meals")
const { createToken } = require("../helpers/tokens");


async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM meals");

  await db.query(`
    INSERT INTO users(id,
                      username,
                      password,
                      email)
    VALUES (1, 'u1', $1, 'u1@email.com'),
           (2, 'u2', $2, 'u2@email.com')
    RETURNING username`,
  [
    await bcrypt.hash("password", BCRYPT_WORK_FACTOR),
    await bcrypt.hash("password", BCRYPT_WORK_FACTOR),
  ]);

  await db.query(`
    INSERT INTO meals
        (id, user_id, name, calories, day, time)
    VALUES 
        (1, 1, 'meal', 200, 'sunday', 'dinner'),
        (2, 1, 'meal', 400, 'sunday', 'lunch');
    `);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


const u1Token = createToken({ username: "u1" });
const u2Token = createToken({ username: "u2" });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token
};
