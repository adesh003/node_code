const { stack } = require('../app');
const AppError = require('../utils/appError');
const handleCastErrorDB = err=>{
  const message = `invalid ${err.path}: ${err.value}`
  return new AppError(message, 400)
}
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if(err.isOperational){
    
  
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })}
  // programming or other unkown error: don't leak error details
  else{
    // 1) Log Error
    console.log("ERROR🔥🔥", err)
    
    res.status(500).json({
      status:'error',
      message:"something went wrong"
    })
  }
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  
  if (process.env.NODE_ENV === 'devlopment') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    
    if(err.name === 'CastError'){
      let error = {...err};
    error = handleCastErrorDB(error)
    }
    sendErrorProd(err, res);
  }
};
