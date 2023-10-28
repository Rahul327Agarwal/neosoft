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
    
    res.render("pageNotFound")
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/", async (req, res) => {
  try {
        res.render("pageNotFound")
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.put("/", async (req, res) => {
  try {
        res.render("pageNotFound")
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.delete("/", async (req, res) => {
  try {
        res.render("pageNotFound")
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// here we are gicing path for all the static files/images that will be used in your hbs file.
// keeping this at last otherwise this will be run at the top
app.use(express.static(staticPath));

module.exports = app;
