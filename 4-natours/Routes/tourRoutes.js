const tourController = require('./../controllers/tourController')
const express = require('express')

const tourRouter = express.Router();

// tourRouter.param('id' ,tourController.checkID)

// check a checkbody middleware
// check if body containss the name and price property
// if not , send back 400
// Add it to post handler stack

tourRouter
.route('/')
.get(tourController.getAllTours)
.post(tourController.createTour)
.delete(tourController.deleteTour);

tourRouter.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour);

module.exports = tourRouter;