var express = require('express');
var router = express.Router();
const Food = require('../models/Food');
const mongoose = require('mongoose');

/* GET food listing. */
router.get('/', function(req, res, next) {
  Food.find()
    .exec()
    .then(foods => {
      console.log(JSON.stringify(foods));
      res.status(200).json(foods);
    });
});

router.get('/:foodId', (req, res, next) => {
  Food.findById(req.params.foodId)
    .exec()
    .then(food => {
      res.status(200).json(food);
    });
});

// title: {
//     type: String,
//     required: true
// },
// description: {
//     type: String,
//     required: true
// },
// expiration: {
//     type: Date,
//     required: true
// },
// imgsrc: {
//     type: String,
//     required: true
// },
// active: {
//     type: Boolean,
//     required: true
// }

router.post('/', (req, res, next) => {

    const food = new Food({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        expiration: req.body.expiration,
        imgsrc: req.body.imgsrc,
        status: req.body.status,
        active: true,
    });
    food.save().then((result) => {
        console.log(result);
        res.status(201).json({
            message: 'created product successfully',
            createdFood: food
        });
    });
})

module.exports = router;
