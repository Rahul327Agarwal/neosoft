const mongoose = require("mongoose");

// user model

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    contact:{type:Number},
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
})

const User=mongoose.model("user",userSchema);
module.exports=User;
