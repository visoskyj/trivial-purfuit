const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Question = new Schema({
    question: {
        type: String
    },
    answers: {
        type: [String]
    },
    correctAnswer: {
        type: Number,
        min: 1, max: 100
    },
    category: {
        type: String,
        enum: ['People', 'Event', 'Places', 'Holiday']
    }
});

module.exports = mongoose.model('Question', Question);