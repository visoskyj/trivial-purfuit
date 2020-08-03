import Board from '../Board/Board';
import Token from '../Token/Token';

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

    for (var m = 0; m < 4; m++) {
        for (var n = 0, o = 1; n < 3; n++ , o += 5) {
            boardMap[n + 34 + (m * 3)] = [m + 7, o]
        }
    }
}

const BOARD_SIZE = 56
var boardMap = [];
NumberBoardSpaces()

export default class BoardState {
  board;
  squares;
  numPlayers;
  currentPlayer;
  tokens;
  playerTokens = [];

  constructor(props) {
    console.info("Board: Initializing the board state");
    
    this.board = new Board();
    this.board.numberBoardSpaces()
    console.log(this.board);

    this.squares = Array(BOARD_SIZE).fill(null);
    // POSITIONS IS ARRAY OF BOARD POSITIONS OF ALL PLAYERS
    this.positions = [0, 10, 46, 56];

    // CREATE 4 NEW TOKENS FOR EACH GAME INSTANCE
    for(var i = 0; i < 4; i++){
      this.playerTokens.push(new Token())
    }

    this.numPlayers = 0;
    this.tokens = ["1", "2", "3", "4"]; 
    this.currentPlayer = 0;
  }

  movePlayer(i) {
    console.info("Board: Processing player move: " + (this.currentPlayer + 1));

    if (this.squares[i] !== "O") return;

    // SET CURRENT PLAYER PREVIOUS SPOT BLANK
    this.squares[this.positions[this.currentPlayer]] = "";
    // UPDATE BOARD WITH CURRENT PLAYER TOKEN ON NEW SPOT
    this.squares[i] = this.tokens[this.currentPlayer];
    // SET NEW PLAYER POSITION
    this.positions[this.currentPlayer] = i;

    for (let j = 0; j <= BOARD_SIZE; j++) {
      if (this.squares[j] === "O") this.squares[j] = "";
    }
  }

  updateCurrentPlayer() {
    // UPDATE CURRENT PLAYER TO NEXT PERSON
    this.currentPlayer = (this.currentPlayer + 1) % this.numPlayers;
  }

  getValidMove(diceValue) {
    console.info(
      "Board: Getting Valid moves for player: " + (this.currentPlayer + 1)
    );
    // CLEAR BOARD OF LAST PLAYER POTENTIAL MOVES O
    for (let j = 0; j <= BOARD_SIZE; j++) {
      if (this.squares[j] === "O") this.squares[j] = "";
    }

    var currX, currY, j;

    currX = boardMap[this.positions[this.currentPlayer]][0];
    currY = boardMap[this.positions[this.currentPlayer]][1];

    j = this.positions[this.currentPlayer];

    // LOOP TO CHECK FOR AND DISPLAY POTENTIAL MOVES
    for (var i = 0; i <= BOARD_SIZE; i++) {
      var moveX = boardMap[i][0];
      var moveY = boardMap[i][1];
      var distanceX = Math.abs(moveX - currX);
      var distanceY = Math.abs(moveY - currY);

      if (distanceX + distanceY === diceValue) {
        var rowsColumns = [1, 6, 11];
        var okSpaces = [0, 5, 10, 23, 28, 33, 46, 51, 56];

        // CHECK ROLL OF 5 NOT ILLEGAL JUMP ACROSS BLANK AREA
        if (diceValue === 5) {
          if (moveX === currX && !rowsColumns.includes(currX)) continue;
          if (moveY === currY && !rowsColumns.includes(currY)) continue;
        }

        // CHECK ROLL OF 6 NOT ILLEGAL JUMP ACROSS BLANK AREA
        if (diceValue === 6) {
          if (
            rowsColumns.includes(currX) &&
            rowsColumns.includes(moveX) &&
            currX !== moveX &&
            !okSpaces.includes(i) &&
            !okSpaces.includes(j)
          )
            continue;
          if (
            rowsColumns.includes(currY) &&
            rowsColumns.includes(moveY) &&
            currY !== moveY &&
            !okSpaces.includes(i) &&
            !okSpaces.includes(j)
          )
            continue;
        }

        this.squares[i] = "O";
      }
    }
  }

  getBoard() {
    console.info("Board: Returning board state to caller");
    return this.squares;
  }

  updatePlayers() {
    console.info("Board: Updating board and player positions");
    for (var j = 0; j < this.numPlayers; j++) {
      if (this.squares[this.positions[j]] !== "O")
        this.squares[this.positions[j]] = this.tokens[j];
    }
    // ENSURE CURRENT PLAYER TOKEN DISPLAYED IF MULTIPLE PLAYERS ON SAME TILE
    if (this.squares[this.positions[this.currentPlayer]] !== "O")
      this.squares[this.positions[this.currentPlayer]] = this.tokens[
        this.currentPlayer
      ];
  }

  getCurrentPlayer() {
    console.info("Board: Returning current Player to caller");
    return this.currentPlayer + 1;
  }

  getPlayerCakes(){
    console.info("Board: Returning current Player token to caller");
    // console.info(this.playerTokens)
    return this.playerTokens[this.currentPlayer].getCakePieces();
  }

  updatePlayerCakes(color){
    this.playerTokens[this.currentPlayer].addCakePiece(color)

  }

}

