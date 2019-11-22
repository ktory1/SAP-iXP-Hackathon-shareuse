var express = require('express');
var router = express.Router();
const Food = require('../models/Food');

/* GET home page. */
router.get('/', function(req, res, next) {
  const foods = Food.find();
  res.render('index', {
    title: 'Express',
    foods: foods
  });
});

router.get('/create', function(req, res, next) {
  res.render('create');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/profile', (req, res, next) => {
  res.render('profile');
});

router.get('/history', (req, res, next) => {
  res.render('history');
})

router.get('/home', function(req, res, next) {
  res.render('sample', { title: 'Express' });
});
module.exports = router;
