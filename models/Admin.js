// Import mongoose to define schema and model
const mongoose = require('mongoose');

// import bcrypt for password hashing
const bcrypt = require('bcryptjs');

// create a schema for Admin
const adminSchema = new mongoose.Schema({
  // Admin email(only one admin exists)
  email: {
    type: String,
    required: true,
    unique: true,//no duplicate emails
    lowercase: true, //store email in lowercase
    trim: true, //remove whitespace
  },
  // Admin password(will be hashed)
  password: {
    type: String,
    required: true,
    minlength: 6, //minimum length of 6 characters
  },
  // role based access control
  role: {
    type: String,
    default: 'admin'
  }
},
  {
    timestamps: true// automatically manage createdAt and updatedAt fields
  }
);
// hash password before saving admin document
adminSchema.pre('save', async function () {
  // if password is not modified, proceed to next middleware
  if (!this.isModified('password')) {
    return ;
  }
  // generate salt
  const salt = await bcrypt.genSalt(10);
  // hash the password using the salt
  this.password = await bcrypt.hash(this.password, salt);
  
  
});
// Method to compare entered password with hashed password
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// export the Admin model
module.exports = mongoose.model('Admin', adminSchema);

  
