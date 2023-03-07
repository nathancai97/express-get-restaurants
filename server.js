const express = require("express");
const app = express();
const { sequelize } = require("./db");
const restaurantRouter = require('./routes/restaurantRoutes');

const port = 3000;

app.use(express.json());

app.use("/restaurants", restaurantRouter);

app.listen(port, () => {
  sequelize.sync();
  console.log("Your server is listening on port " + port);
});

//TODO: Create your GET Request Route Below:
