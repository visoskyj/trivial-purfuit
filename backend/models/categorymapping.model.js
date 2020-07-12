const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategoryToColor = new Schema({
    color: {
        type: String,
        enum: ['Red', 'White', 'Blue', 'Green']
    },
    category: {
        type: String,
        enum: ['People', 'Event', 'Places', 'Holiday']
    }
});

module.exports = mongoose.model('CategoryToColor', CategoryToColor);