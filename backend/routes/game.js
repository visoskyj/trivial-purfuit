const express = require('express');
const gameRoutes = express.Router();
let BoardState = require('../models/boardstate.model');
const BoardLogic = require('../components/BoardState')


const positions = [0, 10, 46, 56];
const BOARD_SIZE = 56

gameRoutes.route('/').get(function(req, res){
    BoardState.find(function(err, board) {
        if(err){
            console.log(err);
        } else{
            res.json(board);
        }
    })
});

gameRoutes.route('/new').post(function(req,res) {
    console.log("route new");
    let board = new BoardState;
    board.numPlayers = req.body.players;
    const cakes = {cake:[]}
    for(var i = 0; i < req.body.players; i++){
        board.tokens.push(cakes);
    }
    board = BoardLogic.updatePlayers(board);
    board.save();
    res.json(board);
});

gameRoutes.route('/cakes').get(function(req, res){
    console.log("route cakes");
    BoardState.find(function(err, board) {
        if(err){
            console.log(err);
        } else{
            let currentBoard = board[board.length - 1];
            let = cakes = BoardLogic.getPlayerCakes(currentBoard);
            res.json(cakes);
        }
    })
});

gameRoutes.route('/updatecakes').post(function(req, res){
    console.log("route updatecakes");
    BoardState.find(function(err, board) {
        if(err){
            console.log(err);
        } else{
            let currentBoard = board[board.length - 1];
            currentBoard = BoardLogic.updatePlayerCakes(currentBoard, req.body.color);
            currentBoard.update({tokens: currentBoard.tokens}, function(err, doc) {
                if (err) return console.error(err);
                console.log("Document inserted successfully!");
            });
            res.status(200).json(currentBoard);
        }
    })
});
 
gameRoutes.route('/playermove').post(function(req,res){
    console.log("route playermove");
    BoardState.find(function(err, board) {
        if(err){
            console.log(err);
        } else{
            let currentBoard = board[board.length - 1];
            currentBoard = BoardLogic.getValidMove(currentBoard, req.body.diceValue);
            console.log("after making changes")
            console.log(currentBoard)
            currentBoard.update({board: currentBoard.board}, function(err, doc) {
                if (err) return console.error(err);
                console.log("Document inserted successfully!");
            });
            res.status(200).json(currentBoard);
        }
    })
});

gameRoutes.route('/updatePlayers').get(function(req,res){
    console.log("route updatePlayers");
    BoardState.find(function(err, board) {
        if(err){
            console.log(err);
        } else{
            let currentBoard = board[board.length - 1];
            currentBoard = BoardLogic.updatePlayers(currentBoard);
            currentBoard.update({board: currentBoard.board}, function(err, doc) {
                if (err) return console.error(err);
                console.log("Document inserted successfully!");
            });
            res.status(200).json(currentBoard);
        }
    })
});

gameRoutes.route('/updateTurn').get(function(req,res){
    console.log("route updateTurn");
    BoardState.find(function(err, board) {
        if(err){
            console.log(err);
        } else{
            let currentBoard = board[board.length - 1];
            currentBoard = BoardLogic.updateCurrentPlayer(currentBoard);
            currentBoard.update({currentPlayer: currentBoard.currentPlayer, turn: currentBoard.turn}, function(err, doc) {
                if (err) return console.error(err);
                console.log("Document inserted successfully!");
            });
            res.status(200).json(currentBoard);
        }
    })
});

gameRoutes.route('/movePlayer').post(function(req,res){
    console.log("route movePlayer");
    BoardState.find(function(err, board) {
        if(err){
            console.log(err);
        } else{
            let currentBoard = board[board.length - 1];
            currentBoard = BoardLogic.movePlayer(currentBoard, req.body.spot);
            currentBoard.update({
                currentPlayer: currentBoard.currentPlayer,
                turn: currentBoard.turn,
                board: currentBoard.board,
                positions: currentBoard.positions
                }, function(err, doc) {
                if (err) return console.error(err);
                console.log("Document inserted successfully!");
            });
            res.status(200).json(currentBoard);
        }
    })
});



module.exports = gameRoutes;