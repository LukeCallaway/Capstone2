"use strict";

const db = require("../db");

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

class Meals {

    static async getAll() {
        const result = await db.query(
            `SELECT 
                name,
                calories,
                protein,
                carbs,
                fats,
                day,
                time
            FROM meals
            `
        )
        return result.rows;
    }

    static async getMeal(id){
        const result = await db.query(
            `SELECT 
                user_id,
                name,
                calories,
                protein,
                carbs,
                fats,
                day,
                time
            FROM meals
            WHERE id = $1`,
            [id]
        )

        const meal = result.rows[0];
        if(!meal) throw new NotFoundError(`No meal by id: ${id}`);

        return meal;
    }

    static async addMeal(userId, name, calories, protein, carbs, fats, day, time){
        const result = await db.query(
            `INSERT INTO meals
            (user_id,
            name,
            calories,
            protein,
            carbs,
            fats,
            day,
            time)
            VALUES ($!,$2,$3,$4,$5,$6,$7,$8)
            RETURNING user_id, name, calories, protein, carbs, fats, day, time`,
            [userId, name, calories, protein, carbs, fats, day, time]
        )

        const meal = result[0];
        return meal;
    }


    static async update(id,  data) {
    
        const { setCols, values } = sqlForPartialUpdate(
            data);
        const mealID = "$" + (values.length + 1);
    
        const querySql = `UPDATE meals 
                          SET ${setCols} 
                          WHERE id = ${mealID} 
                          RETURNING 
                            user_id,
                            name,
                            calories,
                            protein,
                            carbs,
                            fats,
                            day,
                            time`;
        const result = await db.query(querySql, [...values, id]);
        const meal = result.rows[0];
    
        if (!meal) throw new NotFoundError(`No meal by id: ${id}`);
    
        return user;
      }
    

    static async remove(id){
        const result = await db.query(
            `DELETE 
            FROM meals
            WHERE id = $1
            RETURNING id, name, day, time`,
            [id]
        );
    }
}

module.exports = Meals;