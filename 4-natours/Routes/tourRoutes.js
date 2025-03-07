const tourController = require('./../controllers/tourController')
const express = require('express')

const tourRouter = express.Router();

tourRouter.route('/').get(tourController.getAllTours).post(tourController.createTour).delete(tourController.deleteTour);
tourRouter.route('/:id').get(tourController.getTour).patch(tourController.updateTour);

module.exports = tourRouter;