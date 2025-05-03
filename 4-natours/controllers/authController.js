const jwt= require('jsonwebtoken')
const user = require('../models/userModel')
const catchAsync = require('../utils/catchAsync');

exports.signup= catchAsync(async (req, res,next) =>{
  const newUser = await user.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    confirmpassword:req.body.confirmpassword
  })
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPRIRE_IN
  });
  res.status(201).json({
    status: 'sucess',
    token,
    data:{
      user:newUser
    }
  });
});

