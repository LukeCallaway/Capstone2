"use strict";

const request = require("supertest");

const app = require("../app");

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


describe("get /meals/", function () {
    test("works", async function () {
      const resp = await request(app).get("/meals")
        expect(resp.body).toEqual({
            "meals": [
            {
                "calories": 200,
                "carbs": 0,
                "day": "sunday",
                "fats": 0,
                "id": 1,
                "name": "meal",
                "protein": 0,
                "time": "dinner",
            },
            {
                "calories": 400,
                "carbs": 0,
                "day": "sunday",
                "fats": 0,
                "id": 2,
                "name": "meal",
                "protein": 0,
                "time": "lunch",
            },
            ],
        });
      expect(resp.statusCode).toEqual(200);
    });
});

describe("get /meals/:username/:mealID", function () {
    test("works", async function () {
      const resp = await request(app)
      .get("/meals/u1/1")
      .set("authorization", `Bearer ${u1Token}`);
      
        expect(resp.body).toEqual({
            "meal":{
                "calories": 200,
                "carbs": 0,
                "day": "sunday",
                "fats": 0,
                "user_id": 1,
                "name": "meal",
                "protein": 0,
                "time": "dinner",
            }
        });
      expect(resp.statusCode).toEqual(200);
    });

    test('throws unauth error for no token', async () => {
        const resp = await request(app)
        .get("/meals/u1/1")

        expect(resp.body).toEqual( {"error": {"message": "Unauthorized", "status": 401}})
        expect(resp.statusCode).toEqual(401)
    })
});

describe("post /meals/:username", function () {
    test("works", async function () {
      const resp = await request(app)
      .post("/meals/u1")
      .set("authorization", `Bearer ${u1Token}`)
      .send({
        'calories': 100, 
        'carbs': 100,
        'day': 'Friday',
        'fats': 100,
        'name': 'meal',
        'protein': 100,
        'time': 'dinner',
        'userId': 1
      })
      
        expect(resp.body).toEqual({meal: {
                'calories': 100, 
                'carbs': 100,
                'day': 'Friday',
                'fats': 100,
                'name': 'meal',
                'protein': 100,
                'time': 'dinner',
                'user_id': 1
              }}
            );
      expect(resp.statusCode).toEqual(201);
    });

    test('throws unauth error for no token', async () => {
        const resp = await request(app)
        .post("/meals/u1/")

        expect(resp.body).toEqual( {"error": {"message": "Unauthorized", "status": 401}})
        expect(resp.statusCode).toEqual(401)
    })
});


describe("patch /meals/:username/:mealID", function () {
    test("works", async function () {
      const resp = await request(app)
      .patch("/meals/u1/1")
      .set("authorization", `Bearer ${u1Token}`)
      .send({
        'calories': 100, 
        'carbs': 100,
        'day': 'Friday',
        'fats': 100,
        'name': 'New Meal Name',
        'protein': 100,
        'time': 'dinner'
      })
      
        expect(resp.body).toEqual({meal: {
                'calories': 100, 
                'carbs': 100,
                'day': 'Friday',
                'fats': 100,
                'name': 'New Meal Name',
                'protein': 100,
                'time': 'dinner',
                'user_id': 1,
                'id': 1
              }}
            );
      expect(resp.statusCode).toEqual(200);
    });

    test('throws unauth error for no token', async () => {
        const resp = await request(app)
        .patch("/meals/u1/1")

        expect(resp.body).toEqual( {"error": {"message": "Unauthorized", "status": 401}})
        expect(resp.statusCode).toEqual(401)
    })
});


describe("delete /meals/:username/:mealID", function () {
    test("works", async function () {
      const resp = await request(app)
      .delete("/meals/u1/1")
      .set("authorization", `Bearer ${u1Token}`)
      
        expect(resp.body).toEqual({ "deleted": "1" });
      expect(resp.statusCode).toEqual(200);
    });

    test('throws unauth error for no token', async () => {
        const resp = await request(app)
        .delete("/meals/u1/1")

        expect(resp.body).toEqual( {"error": {"message": "Unauthorized", "status": 401}})
        expect(resp.statusCode).toEqual(401)
    })
});