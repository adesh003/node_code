const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet')
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');
const hpp = require ('hpp')

const app = express();

// 1)GLOBAL MIDDLEWARES
// SET Security HTTP HEADER
app.use(helmet());

// DEVELOPMENT LOGIN
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter= rateLimit({
  max:100,
  windowMs:60 * 60 *1000,
  message:"Too many request from this IP, please try again in an hour!"
})

app.use('/api' , limiter);

// BODY PARSER , READING DATA FROM BODY INTO REQ.BODY
app.use(express.json({limit:'10kb'}));

// data sanitization againts NOSQL query injection

// data santization againsts XSS


// prevent parametetr plollution
app.use(hpp({
  whitelist:['duration,']
}))
// serving static file
app.use(express.static(`${__dirname}/public`));


// test milddleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers)
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
