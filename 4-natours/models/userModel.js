const mongoose = require('mongoose');
const validator= require('validator');
const bcrypt = require('bcryptjs')
// const validator = require('validator');
// name , email , photo, password, password confirm

const userSchemas = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Name required'],
  },
  email: {
    type: String,
    require: [true, 'Email required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    require: [true, 'Password Required'],
    minLength: [8, 'Pasword must be 8 charcter'],
  },
  confirmpassword: {
    type: String,
    require: [true, 'Password Required'],
    minLength: [8, 'Pasword must be 8 charcter'],
    validate: {
      //  this only work on CREATE AND SAVE!!
      validator: function (el) {
        return el === this.password; // abc===abc
      },
      message:"Passwords are not same"
    },
  }
});

userSchemas.pre('save',async function(next){
  
  // only run if password modified
  if(!this.isModified('password') )
    return next()
  
  // has the password with 12
  this.password = await bcrypt.hash(this.password,12)
  
  this.confirmpassword = undefined;
  next()
})


const User = mongoose.model('User', userSchemas);
module.exports = User;
