const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
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
    select: false,
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
      message: 'Passwords are not same',
    },
  },
  passwordChangedAt: Date,
});

userSchemas.pre('save', async function (next) {
  // only run if password modified

  if (!this.isModified('password')) return next();

  // hash the password with 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete confirm password field
  this.confirmpassword = undefined;
  next();
});

userSchemas.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchemas.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(this.passwordChangedAt, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  //false means not changed
  return false;
};
const User = mongoose.model('User', userSchemas);
module.exports = User;
