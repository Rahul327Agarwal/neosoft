const express = require("express");
const app = express();
const path = require("path")
const hbs = require('hbs');

const staticPath = path.join(__dirname, "../../public");
const assetsPath = path.join(__dirname, "../../public/assets");
const hbsImagesPath = path.join(__dirname, "../../views/images");
const viewPath = path.join(__dirname, "../../templates/views");
const partialsPath = path.join(__dirname, "../../templates/partials");


app.set('view engine', 'hbs');
app.set('views', viewPath);

hbs.registerHelper('getNavValueByIndex', function (navBar, index) {
  return navBar[index];
});
hbs.registerPartials(partialsPath)


// If file is not avilable at mentioned path then it will move to the new line

// use can access this below page by using http://localhost:1234/index.html
// app.use(express.static(staticPath));
// use can access this below page by using http://localhost:1234/index2.html
// app.use(express.static(assetsPath));

app.get("/", async (req, res) => {
  try {
    res.render("index",{pageInformation:"Music Concert",navBar:[{name:"Home"},"Events","Artists","Tickets"]})
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

// here we are gicing path for all the static files/images that will be used in your hbs file.
// keeping this at last otherwise this will be run at the top
app.use(express.static(staticPath));

module.exports = app;
