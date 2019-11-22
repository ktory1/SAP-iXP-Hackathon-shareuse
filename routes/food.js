var express = require('express');
var router = express.Router();
const food_controller = require('../controllers/foods');

/* GET food listing. */
router.get('/', food_controller.food_get);

router.get('/:foodId', food_controller.food_getId);

router.post('/', food_controller.food_create);

module.exports = router;
