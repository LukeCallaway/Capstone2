"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   *
   * Returns { username, email }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
          `SELECT username,
                  password,
                  email
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username, firstName, lastName, email }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register(
      { username, password, email, calories, protein, carbs, fats }) {
    const duplicateCheck = await db.query(
          `SELECT username
           FROM users
           WHERE username = $1`,
        [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
          `INSERT INTO users
           (username,
            password,
            email,
            calories,
            protein,
            carbs,
            fats)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING username, email, calories, protein, carbs, fats`,
        [
          username,
          hashedPassword,
          email,
          calories, 
          protein,
          carbs, 
          fats
        ],
    );

    const user = result.rows[0];

    return user;
  }

  static async findAll() {
    const result = await db.query(
          `SELECT username,
                  email,
                  calories,
                  protein,
                  carbs,
                  fats
           FROM users
           ORDER BY username`,
    );
    return result.rows;
  }
  /** Given a username, return data about user.
   *
   * Returns { username, first_name, last_name, is_admin, jobs }
   *   where jobs is { id, title, company_handle, company_name, state }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    const userRes = await db.query(
          `SELECT id,
                  username,
                  email,
                  calories,
                  protein,
                  carbs,
                  fats
           FROM users
           WHERE username = $1`,
        [username]
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    const userMealsRes = await db.query(
          `SELECT
            m.id,
            m.name,
            m.calories,
            m.protein,
            m.carbs,
            m.fats,
            m.day,
            m.time
           FROM meals AS m
           LEFT JOIN users AS u
           ON u.id = m.user_id
           WHERE u.username = $1`, [username]);
    user.meals = userMealsRes.rows.map(m => m);
    return user;
  }

  /** Delete given user from database; returns undefined. */

  static async remove(username) {
    let result = await db.query(
          `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
        [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }



}


module.exports = User;
