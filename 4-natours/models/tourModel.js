
const mongoose = require('mongoose');
const slugify = require('slugify')
const tourSchemas = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Name required'],
    unique: true,
  },
  
  slug:String,
  
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
  default: Date.now ,
  select:false
},
  startDates:[Date],
  
},{
  toJSON:{ virtuals :true},
  toObject:{ virtuals :true}

});


 tourSchemas.virtual('durationWeeks').get(function() {
  return this.duration / 7;
 })
 // DOCUMENT MIDDLEWARE RUN BEFORE the .save() and .create()
 tourSchemas.pre('save', function (next){
  this.slug= slugify(this.name , {lower:true})
  next();
 })

//   tourSchemas.pre('save', function(next){
//     console.log("will save document")
//     next();
//   })
 
//  tourSchemas.post('save' , function(doc, next){
//   console.log(doc);
//   next();
//  })
 
const Tour = mongoose.model('Tour', tourSchemas);

module.exports = Tour;
