const express = require("express");
const app = express();
const path = require("path")
const hbs = require('hbs');

const staticPath = path.join(__dirname, "../../public");
const viewPath = path.join(__dirname, "../../templates/views");
const partialsPath = path.join(__dirname, "../../templates/partials");


app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath)

app.get("/", async (req, res) => {
  try {
    const city = req.query.city;
    if(!city)
      res.render("weather",{city})
    else
    {
    const url = `http://api.weatherstack.com/current?access_key=3b243829b0e9c2af410f893ff65f8f3d&query=${city}`;
    const weatherdata = await fetch(url);
    const parsedweatherdata = await weatherdata.json();
    res.render("weather", {city,temp:parsedweatherdata?.current?.temperature})
     }
      
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/", async (req, res) => {
  try {
    res.send("Welcome to the main pages");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.put("/", async (req, res) => {
  try {
    res.send("Welcome to the main pages");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.delete("/", async (req, res) => {
  try {
    res.send("Welcome to the main pages");
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.use(express.static(staticPath));

module.exports = app;
