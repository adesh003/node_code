const tourController = require('./../controllers/tourController')
const express = require('express')

const tourRouter = express.Router();

// tourRouter.param('id' ,tourController.checkID)

// check a checkbody middleware
// check if body containss the name and price property
// if not , send back 400
// Add it to post handler stack

tourRouter
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);
  
tourRouter.route('/tour-stats')
.get(tourController.getTourStats )
tourRouter.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);


tourRouter
.route('/')
.get(catchAsync(tourController.getAllTours)) 
.post(tourController.createTour)


tourRouter.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour);

module.exports = tourRouter;