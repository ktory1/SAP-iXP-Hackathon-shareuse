const mongoose = require('mongoose');

const FoodSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  expiration: {
    type: Date,
    required: true
  },
  imgsrc: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  acceptor: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Foods', FoodSchema);
