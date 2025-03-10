
const mongoose = require('mongoose');

const tourSchemas = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Name required'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    require: [true, 'Must have price'],
  },
});

const Tour = mongoose.model('Tour', tourSchemas);

module.exports = Tour;
