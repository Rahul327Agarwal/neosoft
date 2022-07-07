const express = require("express");
const app = express();
const User = require("../Models/userModel");

app.get("/", async (req, res) => {
  try {
    res.send("Hello Rahul");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const exist = await User.findOne({ email: email });
    if (exist)
      res.status(400).send({ msg: "User already exist. please signin" });
    else {
      const user = await User.create(req.body);
      res.send(user);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = app;
