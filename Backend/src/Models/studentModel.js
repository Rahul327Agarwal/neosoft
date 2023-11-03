const mongoose = require("mongoose");

// student model

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [5, "Please enter minimum 5 characters"],
  },
  birthdate: {
    type: Date,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  isIndian: {
    type: Boolean,
    default: false,
  },
  address: {
    street: String,
    city: String,
    zip: String,
  },
  subjects: [String],
  // profilePicture,
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
