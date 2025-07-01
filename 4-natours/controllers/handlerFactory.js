
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');



exports.deleteOne = Model =>
  catchAsync(async (req, res) => {
    const docs = await Model.findByIdAndDelete(req.params.id);

    if (!docs) {
      return next(new AppError('No document fouund with that ID ', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
  
  
  exports.updateOne = (Model) =>catchAsync(async (req, res, next) => {
      const docs = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!docs) {
        return next(new AppError('No Document fouund with that ID ', 404));
      }
      res.status(200).json({
        status: 'Success',
        data: {
          data:docs,
        },
      });
    });
  
exports.createOne = (Model) => catchAsync(async (req, res, next) => {
    const docs = await Model.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: {
        data: docs,
      },
    });
  });