var express = require('express');
var router = express.Router();
const Food = require('../models/Food');
const mongoose = require('mongoose');
var util = require('util');

/* GET home page. */
router.get('/', function(req, res, next) {
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

/* GET logged in home page. */
router.get('/home', (req, res, next) => {
  Food.find()
    .exec()
    .then(foods => {
      // console.log(JSON.stringify(foods));
      res.render('HomepageUserLoggedIn', {
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
    location: req.body.location,
    expiration: new Date(new Date().getTime() + req.body.availability * 60000),
    imgsrc: req.body.imgsrc,
    status: 'available',
    active: true,
    creator: 'me',
    acceptor: ''
  });
  food.save().then(result => {
    console.log(result);
    res.render('create');
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

/* POST accept food details page */
router.post('/details/:foodId', (req, res) => {
  Food.findOneAndUpdate(
    { _id: req.params.foodId },
    { acceptor: 'me', status: 'in progress' },
    { upsert: true, new: true },
    (err, doc) => {
      if (err) res.status(500).json({ error: err });
      res.render('details', doc);
    }
  );
});

/* GET history page. */
router.get('/history', (req, res, next) => {
  Promise.all([
    Food.find({ creator: 'me' }),
    Food.find({ acceptor: 'me' })
  ]).then(([createdItems, acceptedItems]) => {
    console.log(util.format('user=%O member=%O', createdItems, acceptedItems));
    res.render('history', {
      created: createdItems.sort(function(a,b){return b.expiration - a.expiration}),
      accepted: acceptedItems.sort(function(a,b){return b.expiration - a.expiration})
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
