const express = require("express");
const app = express();
const { Restaurant } = require("./models/index");
const { sequelize } = require("./db");

const port = 3000;

app.use(express.json());

app.listen(port, () => {
  sequelize.sync();
  console.log("Your server is listening on port " + port);
});

//TODO: Create your GET Request Route Below:

app.get("/restaurants", async (req, res) => {
  const data = await Restaurant.findAll();
  return res.json(data);
});

app.get("/restaurants/:id", async (req, res) => {
  const data = await Restaurant.findByPk(req.params.id);
  return res.json(data);
});

app.post("/restaurants", async (req, res) => {
  const restaurant = await Restaurant.create(req.body);
  res.json(restaurant);
});

app.put("/restaurants/:id", async (req, res) => {
  let restaurant = await Restaurant.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.json(restaurant);
});

app.delete("/restaurants/:id", async (req, res) => {
  let restaurant = await Restaurant.destroy({
    where: {
      id: req.params.id
    }
  });
  res.json(restaurant);
})