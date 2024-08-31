"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const User = require("./user.js");
const Meals = require("./meals.js")
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('shows all meals', () => {
    test('works', async () => {
        const res = await Meals.getAll()
        expect(res).toEqual([{
            "calories": 200, 
            "carbs": 0, 
            "day": "sunday", 
            "fats": 0, 
            "id": 1, 
            "name": "meal",
            "protein": 0, 
            "time": "dinner"},
            {"calories": 400, 
            "carbs": 0, 
            "day": "sunday", 
            "fats": 0, 
            "id": expect.any(Number), 
            "name": "meal", 
            "protein": 0, 
            "time": "lunch"}, 
            {"calories": 600, 
            "carbs": 0, 
            "day": "monday", 
            "fats": 0, 
            "id": expect.any(Number), 
            "name": "meal", 
            "protein": 0, 
            "time": "dinner"}, 
            {"calories": 400, 
            "carbs": 0, 
            "day": "monday", 
            "fats": 0, 
            "id": expect.any(Number), 
            "name": "meal", 
            "protein": 0, 
            "time": "lunch"},
            {"calories": 200, 
            "carbs": 0, 
            "day": "sunday", 
            "fats": 0, 
            "id": expect.any(Number), 
            "name": "meal", 
            "protein": 0, 
            "time": "breakfast"}])
    })
})

describe('show single meal', () => {
    test('it works', async () => {
        const res = await Meals.getMeal(1);
        expect(res).toEqual({
            "calories": 200,
            "carbs": 0,
            "day": "sunday",
            "fats": 0,
            "name": "meal",
            "protein": 0,
            "time": "dinner",
            "user_id": 1,
        });
    });
});

describe("create", function () {
    const newMeal = {
        userId: 1,
        name: 'created meal',
        day: 'sunday',
        time: 'breakfast',
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0
    };
  
    test("works", async function () {
      const meal = await Meals.addMeal(newMeal);
      expect(meal).toEqual({
        "day": "sunday",
        "calories": 0,
        "protein": 0,
        "carbs": 0,
        "fats": 0,
        "name": "created meal",
        "time": "breakfast",
        "user_id": 1, // newMeal is userId addMeal returns user_id
      });             // expect(meal).toEqual(newMeal) with userId => user_id 
    });
  });

describe('update meal', () => {
    test('it works', async () => {
        const meal = await Meals.update(1, {'calories': 400});

        expect(meal).toEqual({
            "calories": 400, // only calorie's value is changed 
            "carbs": 0, 
            "day": "sunday", 
            "fats": 0, 
            "id": 1, 
            "name": "meal",
            "protein": 0, 
            "time": "dinner",
            "user_id": 1});
    });
    test('it throws error for meal not found', async () => {
        try {               // bad ID
            await Meals.update(10, {'calories': 400});
            fail();
          } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
          };
    });
});

describe('delete meal', () => {
    test('it works', async () => {
        await Meals.remove(1);
        const res = await Meals.getAll(); 
        // after removal 4 meals left in database
        expect(res.length).toEqual(4);
    })
})

