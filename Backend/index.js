const express = require("express");
const app = express();

app.use(express.json()); // middleware convert request in json form

const mongoose = require("mongoose"); // connector between node and mongodb database

const userController = require("./src/Controllers/userController");
const signinController = require("./src/Controllers/signinController");
const taskController = require("./src/Controllers/taskController");
const mainController = require("./src/Controllers/mainController");
const weatherController = require("./src/Controllers/weatherController");
const pageNotFoundController = require("./src/Controllers/pageNotFoundController");
const studentController = require("./src/Controllers/studentController");

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

app.use("/register", userController);
app.use("/studentRegistration", studentController);
app.use("/signin", signinController);
app.use("/task", taskController);
app.use("/", mainController);
app.use("/weather", weatherController);
app.use("*", pageNotFoundController);

// here at below in place of @ i have used %40 in place of the password
const uri =
  "mongodb+srv://rahul:rahul%40123@cluster0.ynbgybw.mongodb.net/MERN_BE";

// to connect with the database
const connect = () => {
  return mongoose.connect(uri);
};

// run the server
app.listen(1234, async () => {
  await connect();
  console.log("server is running on port 1234");
});
