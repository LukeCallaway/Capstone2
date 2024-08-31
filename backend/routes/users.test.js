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


describe("get /users/", function () {
    test("works", async function () {
      const resp = await request(app).get("/users")
        expect(resp.body).toEqual({
            "users":  [
                {
                "calories": 2300,
                "carbs": 450,
                "email": "u1@email.com",
                "fats": 90,
                "protein": 200,
                "username": "u1",
                },
                {
                "calories": 2300,
                "carbs": 450,
                "email": "u2@email.com",
                "fats": 90,
                "protein": 200,
                "username": "u2",
                },
            ],
        });
      expect(resp.statusCode).toEqual(200);
    });
});

describe("get /users/:username", function () {
    test("works", async function () {
      const resp = await request(app)
      .get("/users/u1")
      .set("authorization", `Bearer ${u1Token}`);

      expect(resp.body).toEqual({
        "user":{
            "calories": 2300,
            "carbs": 450,
            "email": "u1@email.com",
            "fats": 90,
            "protein": 200,
            "username": "u1",
                "id": 1,
                "meals":[
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
            }
    });
      expect(resp.statusCode).toEqual(200);
    });
    test("unauth for no token", async function () {
        const resp = await request(app)
        .get("/users/u1")
        expect(resp.body).toEqual( {"error": {"message": "Unauthorized", "status": 401}});
        expect(resp.statusCode).toEqual(401);
    });
});

describe("delete /users/:username", function () {
    test("works", async function () {
      const resp = await request(app)
      .delete("/users/u1")
      .set("authorization", `Bearer ${u1Token}`);
      expect(resp.body).toEqual({ 'deleted': 'u1' })
    });
    test("unauth for no token", async function () {
        const resp = await request(app)
        .delete("/users/u1")
        expect(resp.body).toEqual( {"error": {"message": "Unauthorized", "status": 401}});
        expect(resp.statusCode).toEqual(401);
    });
});