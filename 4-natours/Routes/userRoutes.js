const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('../controllers/authController')

const userRouter = express.Router();



userRouter
.post('/signup', authController.signup);

userRouter
.post('/login', authController.login);

userRouter
  .route('/')
  .get(userController.getAllUser)
  .post(userController.createUser);

userRouter
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
