const express = require("express");
const app = express();
const Task = require("../Models/taskModel");

app.get("/", async (req, res) => {
  try {
    const user = req.query.user;
    const task = await Task.find({ user: user }, { _id: 0, __v: 0 })
      .lean()
      .exec();
    res.send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/", async (req, res) => {
  try {
    const data = req.body;

    // Deleting the old data.
    const deleted = await Task.deleteMany({ user: data[0].user });

    // inserting the data
    Task.insertMany(data);

    res.send({ msg: "success" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = app;
