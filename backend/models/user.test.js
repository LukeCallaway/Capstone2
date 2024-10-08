"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const User = require("./user.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** authenticate */

describe("authenticate", function () {
  test("works", async function () {
    const user = await User.authenticate("u1", "password");
    expect(user).toEqual({
      username: "u1",
      email: "u1@email.com"
    });
  });

  test("unauth if no such user", async function () {
    try {
      await User.authenticate("nope", "password");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });

  test("unauth if wrong password", async function () {
    try {
      await User.authenticate("c1", "wrong");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

/************************************** register */

describe("register", function () {
  const newUser = {
    username: "new",
    email: "test@test.com",
    calories: 2000,
    carbs: 200,
    fats: 20,
    protein: 200
  };

  test("works", async function () {
    let user = await User.register({
      ...newUser,
      password: "password",
    });
    expect(user).toEqual(newUser);
    const found = await db.query("SELECT * FROM users WHERE username = 'new'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });

  test("works: adds user", async function () {
    let user = await User.register({
      ...newUser,
      password: "password"
    });
    expect(user).toEqual({ ...newUser });
    const found = await db.query("SELECT * FROM users WHERE username = 'new'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });

  test("bad request with dup data", async function () {
    try {
      await User.register({
        ...newUser,
        password: "password",
      });
      await User.register({
        ...newUser,
        password: "password",
      });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works", async function () {
    const users = await User.findAll();
    expect(users).toEqual([
      {
        username: "u1",
        email: "u1@email.com",
        calories: 2300,
        carbs: 450,
        fats: 90,
        protein: 200
      },
      {
        username: "u2",
        email: "u2@email.com",
        calories: 2300,
        carbs: 450,
        fats: 90,
        protein: 200
      },
    ]);
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let user = await User.get("u1");
    expect(user).toEqual({
        "username": "u1",
        "calories": 2300,
        "carbs": 450,
        "email": "u1@email.com",
        "fats": 90,
        "id": expect.any(Number),
        "meals": [
            {
            "calories": 200,
            "carbs": 0,
            "day": "sunday",
            "fats": 0,
            "id": expect.any(Number),
            "name": "meal",
            "protein": 0,
            "time": "dinner",
            },
            {
            "calories": 400,
            "carbs": 0,
            "day": "sunday",
            "fats": 0,
            "id": expect.any(Number),
            "name": "meal",
            "protein": 0,
            "time": "lunch",
            },
            {
            "calories": 600,
            "carbs": 0,
            "day": "monday",
            "fats": 0,
            "id": expect.any(Number),
            "name": "meal",
            "protein": 0,
            "time": "dinner",
            },
            {
            "calories": 400,
            "carbs": 0,
            "day": "monday",
            "fats": 0,
            "id": expect.any(Number),
            "name": "meal",
            "protein": 0,
            "time": "lunch",
            },
            {
            "calories": 200,
            "carbs": 0,
            "day": "sunday",
            "fats": 0,
            "id": expect.any(Number),
            "name": "meal",
            "protein": 0,
            "time": "breakfast",
            },
        ],
        "protein": 200,
    });
  });

  test("not found if no such user", async function () {
    try {
      await User.get("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

// /************************************** update */

// describe("update", function () {
//   const updateData = {
//     firstName: "NewF",
//     lastName: "NewF",
//     email: "new@email.com"
//   };

//   test("works", async function () {
//     let job = await User.update("u1", updateData);
//     expect(job).toEqual({
//       username: "u1",
//       ...updateData,
//     });
//   });

//   test("works: set password", async function () {
//     let job = await User.update("u1", {
//       password: "new",
//     });
//     expect(job).toEqual({
//       username: "u1",
//       firstName: "U1F",
//       lastName: "U1L",
//       email: "u1@email.com"
//     });
//     const found = await db.query("SELECT * FROM users WHERE username = 'u1'");
//     expect(found.rows.length).toEqual(1);
//     expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
//   });

//   test("not found if no such user", async function () {
//     try {
//       await User.update("nope", {
//         firstName: "test",
//       });
//       fail();
//     } catch (err) {
//       expect(err instanceof NotFoundError).toBeTruthy();
//     }
//   });

//   test("bad request if no data", async function () {
//     expect.assertions(1);
//     try {
//       await User.update("c1", {});
//       fail();
//     } catch (err) {
//       expect(err instanceof BadRequestError).toBeTruthy();
//     }
//   });
// });

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await User.remove("u1");
    const res = await db.query(
        "SELECT * FROM users WHERE username='u1'");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such user", async function () {
    try {
      await User.remove("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
