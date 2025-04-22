const express = require('express');
const app = express();
// const fs = require('fs');
const globalErrorHandler = require('./controllers/errorController')
const AppError = require('./utils/appError')

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

  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
})


app.use(globalErrorHandler)

// SERVER
module.exports = app