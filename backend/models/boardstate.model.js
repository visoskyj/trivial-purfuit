const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const positions = [0, 10, 46, 56];
const BOARD_SIZE = 56


let BoardState = new Schema({
    board: {
        type: [mongoose.Mixed],
        default: Array(BOARD_SIZE).fill(null)
    },
    positions: {
        type: [Number],
        default: positions
    },
    numPlayers: {
        type: Number
    },
    currentPlayer: {
        type: Number,
        default: 0,
    },
    turn: {
      type: Number,
      default: 0
    },
    tokens:
    [
        {
            cake: {pieces:[String]}
        }
    ]
});

module.exports = mongoose.model('BoardState', BoardState);