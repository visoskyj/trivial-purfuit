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

const BOARD_SIZE = 56;
const boardMap = [];
NumberBoardSpaces();

const COLORS = ["Red", "White", "Blue", "Green"];
const TOKENS = ["1", "2", "3", "4"];

function addCakePiece(token, color) {
    if(!token.cake.pieces.includes(color)){
        token.cake.pieces.push(color);
    }
    return token;
  }

module.exports = {
    movePlayer: function (data, i) {
        console.info("Board: Processing player move: " + (data.currentPlayer + 1));

        if (data.board[i] !== "O") return data;

        // SET CURRENT PLAYER PREVIOUS SPOT BLANK
        data.board[data.positions[data.currentPlayer]] = "";
        // UPDATE BOARD WITH CURRENT PLAYER TOKEN ON NEW SPOT
        data.board[i] =  TOKENS[data.currentPlayer];
        // SET NEW PLAYER POSITION
        data.positions[data.currentPlayer] = i;

        for (let j = 0; j <= BOARD_SIZE; j++) {
        if (data.board[j] === "O") data.board[j] = "";
        }
        data.turn = data.turn + 1;
        console.info(data)
        return  data;
    },

    updateCurrentPlayer: function (data) {
        // UPDATE CURRENT PLAYER TO NEXT PERSON
        data.currentPlayer = (data.currentPlayer + 1) % data.numPlayers;
        return data;
    },

    getValidMove: function (data, diceValue) {
        console.info(
        "Board: Getting Valid moves for player: " + (data.currentPlayer + 1)
        );
        // CLEAR BOARD OF LAST PLAYER POTENTIAL MOVES O
        for (let j = 0; j <= BOARD_SIZE; j++) {
        if (data.board[j] === "O") data.board[j] = "";
        }

        var currX, currY, j;

        currX = boardMap[data.positions[data.currentPlayer]][0];
        currY = boardMap[data.positions[data.currentPlayer]][1];

        j = data.positions[data.currentPlayer];

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

                data.board[i] = "O";
            }
        }
        return data;
    },

    updatePlayers: function (data) {
        console.info("Board: Updating board and player positions");
        
        for (var j = 0; j < data.numPlayers; j++) {
        if (data.board[data.positions[j]] !== "O")
            data.board[data.positions[j]] = TOKENS[j];
        }
        // ENSURE CURRENT PLAYER TOKEN DISPLAYED IF MULTIPLE PLAYERS ON SAME TILE
        if (data.board[data.positions[data.currentPlayer]] !== "O")
            data.board[data.positions[data.currentPlayer]] = TOKENS[data.currentPlayer];
        return data;
    },

    getPlayerCakes: function(data){
        console.info("Board: Returning current Player token to caller");
        return data.tokens[data.currentPlayer];
    },

    updatePlayerCakes: function (data, color){       
        data.tokens[data.currentPlayer] = addCakePiece(data.tokens[data.currentPlayer], color);
        return data;
    }
}