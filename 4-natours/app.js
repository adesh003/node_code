const express = require('express');
const app = express();
// const fs = require('fs');

const morgan = require('morgan');
const tourRouter = require('./Routes/tourRoutes')
const userRouter = require('./Routes/userRoutes');

/// 1 ) MIDDLEWARE

app.use(morgan('dev'));

app.use(express.json());
// app.use((req, res, next) => {
//   console.log('hello from the middleware');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


// ROUTE HANDLER

// 3) ROUTES



app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/user', userRouter);

app.all('*', (req,res,next)=>{
  // res.status(404).json({
  //   status:'fail',
  //   Message:`can't find ${req.originalUrl} on this server`
  // }).
  const err = new Error(`can't find ${req.originalUrl} on this server`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err)
})


app.use((err, req, res, next) =>{
  
  err.statusCode = err.statusCode || 500 
  err.status = err.status || 'error'
  res.status(err.statusCode).json({
    status:err.status,
    Message:err.Message
  })
})

// SERVER
module.exports = app