// review // rating // createdAT // ref tp tour // ref to user



const mongoose = require('mongoose');
const { isEmpty } = require('validator');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review can not be Empty'],
  },
  ratting: {
    type: Number,
    min: 1,
    maz: 5,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    require: [true, 'Review must belong to tour'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref:'User',
    required:[true, ' review must belong to user']
  },
  
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

const Review = mongoose.model('Review' , reviewSchema)


module.exports = Review;