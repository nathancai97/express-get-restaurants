const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;

//TODO: Create your GET Request Route Below: 
app.get('/restaurants', async (req, res) => {
    const data = await Restaurant.findAll();
    return res.json(data);
})

app.get('/restaurants/:id', async (req, res) => {
    const data = await Restaurant.findByPk(req.params.id);
    return res.json(data);
})

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})