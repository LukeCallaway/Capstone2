"use strict";

/** Routes for meals. */

const express = require("express");
const { ensureCorrectUser } = require("../middleware/auth");
const Meals = require("../models/meals");

const router = express.Router();

/** GET /  => { meals }
 *
 * This returns all meals
 *
 * 
 **/
router.get("/",  async function (req, res, next) {
    try {
      const meals = await Meals.getAll();
      return res.json({ meals });
    } catch (err) {
      return next(err);
    }
  });

/** GET /[id] => { meal }
 *
 * Authorization required: same user as username url param 
 **/

router.get("/:username/:id", ensureCorrectUser, async function (req, res, next) {
  try {
    const meal = await Meals.getMeal(req.params.id);

    return res.json({ meal });
  } catch (err) {
    return next(err);
  }
});

/** POST / { username/id }  => { meal }
 *
 * This returns the newly created meal
 *
 * Authorization required: same user as meal's user_id
 **/

router.post("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
  
      const meal = await Meals.addMeal(req.body);
      return res.status(201).json({ meal });
    } catch (err) {
      return next(err);
    }
  });

/** patch / { username/id }  => { meal }
 *
 * This returns the updated meal
 *
 * Authorization required: same user as meal's user_id
 **/
  router.patch("/:username/:id", ensureCorrectUser, async function (req, res, next) {
    try {
     
      const meal = await Meals.update(req.params.id, req.body);
      return res.json({ meal });

    } catch (err) {
      return next(err);
    }
  });
  
/** DELETE /[id]  =>  { deleted: meal_id }
 *
 * Authorization required: same user as username url param
 **/

router.delete("/:username/:id", ensureCorrectUser, async function (req, res, next) {
  try {
    await Meals.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;