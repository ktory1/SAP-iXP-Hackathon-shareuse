const Food = require('../models/Food');

exports.food_create = function(req, res) {
  const food = new Food({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    expiration: req.body.expiration,
    imgsrc: req.body.imgsrc,
    status: req.body.status,
    active: true
  });
  food.save().then(result => {
    // console.log(result);
    res.status(201).json({
      message: 'created product successfully',
      createdFood: food
    });
  });
};

exports.food_get = function(req, res) {
  Food.find()
    .exec()
    .then(foods => {
      //   console.log(JSON.stringify(foods));
      res.status(200).json(foods);
    });
};

exports.food_getId = function(req, res) {
  Food.findById(req.params.foodId)
    .exec()
    .then(food => {
      res.status(200).json(food);
    });
};
