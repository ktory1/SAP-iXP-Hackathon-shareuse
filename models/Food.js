const mongoose = require('mongoose');

const FoodSchema = mongoose.Schema({
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
    active: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Foods', FoodSchema);