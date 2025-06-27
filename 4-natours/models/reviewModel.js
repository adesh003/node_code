const mongoose = require('mongoose');
const { isEmpty } = require('validator');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review can not be Empty'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
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

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'tour',
    select: 'name',
  }).populate({
    path: 'user',
    select: 'name photo'
  });
});

const review = mongoose.model('review', reviewSchema);


module.exports = review;