import React from 'react'
import Gameboard from '../../components/Gameboard/Gameboard'

function NumberBoardSpaces() {
    // SET HORIZONTAL BOARD ROWS
    for (var i = 0; i < 11; i++) {
        boardMap[i] = [1, i + 1];
        boardMap[i + 23] = [6, i + 1];
        boardMap[i + 46] = [11, i + 1];
    }

    // SET VERTICAL BOARD COLUMNS
    for (var h = 0; h < 4; h++) {
        for (var j = 0, k = 1; j < 3; j++ , k += 5) {
            boardMap[j + 11 + (h * 3)] = [h + 2, k]
        }
    }
    for (var h = 0; h < 4; h++) {
        for (var j = 0, k = 1; j < 3; j++ , k += 5) {
            boardMap[j + 34 + (h * 3)] = [h + 7, k]
        }
    }
}

const BOARD_SIZE = 56
var boardMap = [];
const TEST = 51
NumberBoardSpaces()


class Game extends React.Component {

    constructor(props) {
        super(props);

        this.squares = Array(BOARD_SIZE).fill(null);
        this.numPlayers = 4;

        // POSITIONS IS ARRAY OF BOARD POSITIONS OF ALL PLAYERS
        this.positions = [0, 10, 46, 56]
        this.tokens = ["1", "2", "3", "4"]

        // DISPLAY PLAYER TOKENS ON BOARD
        this.squares[this.positions[0]] = this.tokens[0];
        this.squares[this.positions[1]] = this.tokens[1];
        this.squares[this.positions[2]] = this.tokens[2];
        this.squares[this.positions[3]] = this.tokens[3];

        this.currentPlayer = 0;
        this.diceValue = "";
        this.rolledDice = -1;
    }

    // MOVE PLAYER TOKEN TO BOARD SPACE OF CHOICE
    handleClick(i) {
        if (this.squares[i] != "O")
            return;

        // SET CURRENT PLAYER PREVIOUS SPOT BLANK
        this.squares[this.positions[this.currentPlayer]] = "";
        // UPDATE BOARD WITH CURRENT PLAYER TOKEN ON NEW SPOT
        this.squares[i] = this.tokens[this.currentPlayer];
        // SET NEW PLAYER POSITION
        this.positions[this.currentPlayer] = i;
        // UPDATE CURRENT PLAYER TO NEXT PERSON
        this.currentPlayer = (this.currentPlayer + 1) % this.numPlayers;

        for (let j = 0; j <= BOARD_SIZE; j++) {
            if (this.squares[j] == "O")
                this.squares[j] = ""
        }

        this.jumpTo()
    }

    jumpTo() {
        this.setState({
            stepNumber: 0
        });
    }

    // GET DICE ROLL NUMBER AND SHOW SPACES WHERE PLAYER CAN MOVE
    showBoardMove() {

        // RETURN IF PLAYER TRIES TO ROLL DICE WITHOUT SELECTING MOVE
        if (this.rolledDice == this.currentPlayer)
            return;

        // GENERATE RANDOM DICE ROLL NUMBER
        this.diceValue = Math.floor(Math.random() * Math.floor(6)) + 1;
        this.jumpTo()

        // CLEAR BOARD OF LAST PLAYER POTENTIAL MOVES O
        for (let j = 0; j <= BOARD_SIZE; j++) {
            if (this.squares[j] == "O")
                this.squares[j] = ""
        }

        var currX, currY, j;

        currX = boardMap[this.positions[this.currentPlayer]][0]
        currY = boardMap[this.positions[this.currentPlayer]][1]

        j = this.positions[this.currentPlayer]

        // LOOP TO CHECK FOR AND DISPLAY POTENTIAL MOVES
        for (var i = 0; i <= BOARD_SIZE; i++) {
            var moveX = boardMap[i][0]
            var moveY = boardMap[i][1]
            var distanceX = Math.abs(moveX - currX)
            var distanceY = Math.abs(moveY - currY)

            if (distanceX + distanceY == this.diceValue) {
                var rowsColumns = [1, 6, 11]
                var okSpaces = [0, 5, 10, 23, 28, 33, 46, 51, 56]

                // CHECK ROLL OF 5 NOT ILLEGAL JUMP ACROSS BLANK AREA 
                if (this.diceValue == 5) {
                    if (moveX == currX && !rowsColumns.includes(currX))
                        continue;
                    if (moveY == currY && !rowsColumns.includes(currY))
                        continue;
                }

                // CHECK ROLL OF 6 NOT ILLEGAL JUMP ACROSS BLANK AREA 
                if (this.diceValue == 6) {
                    if (rowsColumns.includes(currX) && rowsColumns.includes(moveX) &&
                        currX != moveX && !okSpaces.includes(i) && !okSpaces.includes(j))
                        continue;
                    if (rowsColumns.includes(currY) && rowsColumns.includes(moveY) &&
                        currY != moveY && !okSpaces.includes(i) && !okSpaces.includes(j))
                        continue;
                }

                this.squares[i] = "O"
            }
        }
        this.rolledDice = this.currentPlayer;
    }

    render() {

        const diceRollButton =
            <li>
                <button onClick={() => this.showBoardMove()}>Roll Dice</button>
            </li>

        let displayRoll, displayPlayer;
        displayRoll = "Dice Roll: " + this.diceValue;
        displayPlayer = "Current Player: " + (this.currentPlayer + 1);

        // SHOW ALL PLAYER TOKENS ON THE BOARD
        for (var j = 0; j <= 4; j++) {
            if (this.squares[this.positions[j]] != "O")
                this.squares[this.positions[j]] = this.tokens[j];
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Gameboard
                        squares={this.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{displayRoll}</div>
                    <div>{displayPlayer}</div>
                    <ol>{diceRollButton}</ol>
                </div>
            </div>
        );
    }
}

export default Game
