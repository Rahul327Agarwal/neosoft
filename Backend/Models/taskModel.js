const mongoose = require("mongoose");

// task model

const taskSchema=new mongoose.Schema({
    name:{type:String,required:true},
    priority:{type:String,required:true},
    date:{type:Date,required:true},
    key:{type:String,required:true},
    stage_num:{type:Number,required:true},
    status:{type:String,required:true},
    user:{type:String,required:true}
})

const Task=mongoose.model("task",taskSchema);
module.exports=Task;
