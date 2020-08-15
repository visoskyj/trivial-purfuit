const express = require('express');
const gameRoutes = express.Router();
let BoardState = require('../models/boardstate.model');


const positions = [0, 10, 46, 56];
const BOARD_SIZE = 56

gameRoutes.route('/').get(function(req, res){

    BoardState.find(function(err, board) {
        if(err){
            console.log(err);
        } else{
            console.log(board);
            res.json(board);
        }
    })
});

gameRoutes.route('/new').get(function(req,res) {
    let board = new BoardState;
    board.numPlayers = req.body.players;
    board.save();
    res.json(board);
});


module.exports = gameRoutes;