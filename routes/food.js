var express = require('express');
var router = express.Router();
const Food = require('../models/Food');

/* GET food listing. */
router.get('/', function(req, res, next) {
  const foods = Food.find();
  res.send(foods);
});

router.post('/create', function(req, res, next) {
    
})

module.exports = router;
