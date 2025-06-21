const User = require('./../models/userModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');



const filterObj = (obj,...allowedFiled) =>{
  const newObj={};
  Object.keys(obj).forEach(el=>{
    if (allowedFiled.includes(el)) newObj[el]= obj[el];
  });
return newObj;
}
exports.getAllUser =catchAsync(async(req, res,next) => {
  
   const users = await User.find();

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users,
      },
    });
  })
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route not yet defined',
  });
};


exports.updateMe =catchAsync(async(req, res, next)=>{
  // 1 ) create error if post passwor data

  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        'this Route is not for update password. please use /updateMypassword.',
        400
      )
    );
  }
//2 ) Filtered out inwanted fields names that are not allowed

  const filteredBody = filterObj(req.body, 'name', 'email');

  //3) update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
 
})

exports.deleteMe = catchAsync(async(req, res, body) =>
{
  await User.findByIdAndUpdate(req.user.id ,{active:false})
  
  res.status(204) .json({
    status:'success',
    data:null,
  })
})

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route not yet defined',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route not yet defined',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route not yet defined',
  });
};
