const express = require("express");
const app = express();
const User = require("../Models/userModel");

app.get("/", async (req, res) => {
  try {
    res.send({ msg: "Hello Rahul" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });

    if (user) {
      res.status(200).send(user);
    } else res.status(400).send({ msg: "User does not exist. Please signup" });
  } catch (error) {
    res.status(500).send({ mag: "failed" });
  }
});

module.exports = app;
