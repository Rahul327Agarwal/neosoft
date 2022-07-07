const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const userController = require("./Controllers/userController");
const signinController = require("./Controllers/signinController");
const taskController = require("./Controllers/taskController");
const cors = require('cors');
app.use(cors({
    origin: '*'
}));


app.use('/register',userController);
app.use('/signin',signinController);
app.use('/task',taskController);

const connect =()=>{
return mongoose.connect("mongodb+srv://rahul:rahul123@cluster0.jslpt.mongodb.net/neosoftregister");
}  

app.listen(1234, async () => {
   await connect();
  console.log("server is running on port 1234");
});