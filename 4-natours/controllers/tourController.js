const { query } = require('express');
const Tour = require('./../models/tourModel');
exports.aliasTopTours = (req, res,next)=> {
  
  req.query.limit = '5';
  req.query.sort='-ratingsAverage, price';
  req.query.fields='name, price,ratingsAverage, summary,difficulty';
  next();
}


class APIFeatures {
  constructor(query, queryString){
    this.query= query;
    this.queryString= queryString;
  }
  
  
  filter(){
    //1A) fILTERING
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];

    excludeFields.forEach((el) => delete queryObj[el]);

    //1B ) ADVANCE FILTERING

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
      this.query.find(JSON.parse(queryString));
      return this;
  }
  
  //2 ) SORTING
  sort(){
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    }
    else{
      this.query = this.query.sort('-createdAt')
    }
      return this;

  }
}

exports.getAllTours = async (req, res) => {
  try {
    
    

    

    
      //2) Sorting
      
      
    
    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find() , req.query).filter().sort();
    const tours = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({__id: req.param.id})

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err,
    });
  }

  
};

exports.createTour = async (req, res) => {
  // const newTour = new Tour({})
  // newTour.save()
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'Succes',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'invalid data sent!',
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'Success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};
