const express = require("express");
const router = express.Router();
const { Restaurant } = require("../models/Restaurant");
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  const data = await Restaurant.findAll();
  return res.json(data);
});

router.get("/:id", async (req, res) => {
  const data = await Restaurant.findByPk(req.params.id);
  return res.json(data);
});

router.post(
  "/",
  [
    check("name").not().isEmpty().trim(),
    check("name").isLength({min: 10, max: 30}),
    check("location").not().isEmpty().trim(),
    check("cuisine").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const restaurant = await Restaurant.create(req.body);
      res.json(restaurant);
    }
  }
);

router.put("/:id", async (req, res) => {
  let restaurant = await Restaurant.findByPk(req.params.id);
  await restaurant.update(req.body);
  res.json(restaurant);
});

router.delete("/:id", async (req, res) => {
  let restaurant = await Restaurant.destroy({
    where: {
      id: req.params.id,
    },
  });
  const allRestaurants = await Restaurant.findAll();
  res.json(allRestaurants);
});

module.exports = router;
