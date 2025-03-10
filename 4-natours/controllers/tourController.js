// const fs = require('fs');
// const { nextTick } = require('process');

const Tour = require('./../models/tourModel')

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../starter/dev-data/data/tours-simple.json`)
// );
// tourRouter.route('/').get(getAllTours).post(createTour).delete(deleteTour);
// tourRouter.route('/:id').get(getTour).patch(updateTour);

// exports.CheckBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Check name or price',
//     });
//   }
//   next();
// };

// exports.checkID = (req, res, next, val) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'invalid ID',
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
 try{
  const tours = await Tour.find()
  
  
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
}
catch(err){
  res.status(400).json({
    status:"Failed",
    message:err
  })
  
}
};

exports.getTour = async (req, res) => {
  try{
    const tour = await Tour.findById(req.params.id)
    // Tour.findOne({__id: req.param.id})
  }
  catch(err){
     res.status(400).json({
    status:"Failed",
    message:err
  })
}

  // const tour = tours.find((el) => el.id == id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = async (req, res) => {

  // const newTour = new Tour({})
  // newTour.save()
  try{
  const newTour = await Tour.create(req.body)

  res.status(201).json({
    status: 'Succes',
    data: {
      tour: newTour,
    },
  });
} 
catch(err){
  res.status(400).json({
    status:'failed',
    message:"invalid data sent!"
  })
}
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;

  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<upload tour data>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
