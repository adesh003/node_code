const {promisify}= require('util');
const jwt= require('jsonwebtoken')
const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError')

const signToken = id=>{
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPRIRE_IN,
  });
}

exports.signup= catchAsync(async (req, res,next) =>{
  const newUser = await User.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    confirmpassword:req.body.confirmpassword
  })
  
  const token = signToken(newUser._id)
  
  
  res.status(201).json({
    status: 'sucess',
    token,
    data:{
      user:newUser
    }
  });
});

exports.login=catchAsync(async(req, res, next) =>{
  const{email,password} = req.body;
  
  //1) Check if email and password exist
  
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }
  
  //2) check if user exists && password is correct
  const user = await User.findOne({email}).select('+password');
  
  
  if(!user || !(await user.correctPassword(password,user.password))){
  return next(new AppError('Incorrect email or password' , 401))
  }
  
  //3) if everything ok, send token to client
  
  const token = signToken(User._id);
  res.status(200).json({
    status: 'success',
    token
  })
})

exports.protect = catchAsync(async(req, res, next) =>{
  //1) Getting the token and check of it's there
   let token;
   if (
     req.headers.authorization &&
     req.headers.authorization.startsWith('Bearer')
   ) {
     token = req.headers.authorization.split(' ')[1];
   }
  
  if(!token){
    return next(new AppError('You are not logged in! please log in to get access',401))
  }
  //2) varification token 
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
  //3) check if user still exists 
  
    const freshUser = await User.findById(decoded.id)
    if(!freshUser) {
      return next(new AppError("the user beloning to this roken does no longer exist." , 401))
    }
  
  //4) Check if user change password after the token was issued
    
  if(freshUser.changePasswordAfter(decoded.iat)){
    return next(new AppError("User recently chnaged password! please log in again" , 401))
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = freshUser;
  next();
  
}) 