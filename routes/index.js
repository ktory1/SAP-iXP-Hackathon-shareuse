var express = require('express');
var router = express.Router();
const Food = require('../models/Food');
const food_controller = require('../controllers/foods');

/* GET home page. */
router.get('/', function(req, res, next) {
  const foods = Food.find();
  console.log(foods);
  res.render('index', {
    title: 'Express',
    items: foods
  });
  Food.find()
    .exec()
    .then(foods => {
      // console.log(JSON.stringify(foods));
      res.render('index', {
        title: 'Express',
        items: foods
      });
    });
});

/* GET create new food page. */
router.get('/create', (req, res, next) => {
  res.render('create');
});

/* POST create new food. */
router.post('/food', function(req, res) {
  const food = new Food({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    expiration: req.body.expiration,
    imgsrc: req.body.imgsrc,
    status: req.body.status,
    active: true,
    creator: 'me'
  });
  food.save().then(result => {
    // console.log(result);
    res.status(201).json({
      message: 'created product successfully',
      createdFood: result
    });
  });
});

/* GET food details page. */
router.get('/details/:foodId', (req, res, next) => {
  Food.findById(req.params.foodId)
    .exec()
    .then(food => {
      res.render('details', food);
    });
});

/* GET history page. */
router.get('/history', (req, res, next) => {
  Promise.all([
    Food.find({ creater: 'me' }),
    Food.find({ acceptor: 'me' })
  ]).then(([createdItems, acceptedItems]) => {
    console.log(util.format('user=%O member=%O', createdItems, acceptedItems));
    res.render('history', {
      created: createdItems,
      accepted: acceptedItems
    });
  });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* GET profile page. */
router.get('/profile', (req, res, next) => {
  res.render('profile');
});

module.exports = router;
