const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testJobIds = [];

async function commonBeforeAll() {
  // empty test dbs
  await db.query("DELETE FROM meals");
  await db.query("DELETE FROM users");

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
        (2, 1, 'meal', 400, 'sunday', 'lunch'),
        (3, 1, 'meal', 600, 'monday', 'dinner'),
        (4, 1, 'meal', 400, 'monday', 'lunch'),
        (5, 1, 'meal', 200, 'sunday', 'breakfast');`);
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


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
};