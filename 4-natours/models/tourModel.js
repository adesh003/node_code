
const mongoose = require('mongoose');

const tourSchemas = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Name required'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have difficulty'],
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    require: [true, 'Must have price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have summary'],
  },
  discription: {
    type: String,
    trim: true,
  },
  imageCover:{
    type:String,
    required: [true, 'A tour must have cover image']
  },
  image:[String],
 createdAt: {
  type: Date,
  default: Date.now ,// ✅ Correct
  select:false
},
  startDates:[Date],
  
});

const Tour = mongoose.model('Tour', tourSchemas);

module.exports = Tour;
