// Board Class
export default class Board {
  playerPositions;
  boardMap;
  size = 56;
  constructor() {
    this.positions = [0, 10, 46, 56];
    this.boardMap = [];
    this.numberBoardSpaces();
  }

  numberBoardSpaces() {
    // SET HORIZONTAL BOARD ROWS
    for (var i = 0; i < 11; i++) {
      this.boardMap[i] = [1, i + 1];
      this.boardMap[i + 23] = [6, i + 1];
      this.boardMap[i + 46] = [11, i + 1];
    }

    // SET VERTICAL BOARD COLUMNS
    for (var h = 0; h < 4; h++) {
      for (var j = 0, k = 1; j < 3; j++, k += 5) {
        this.boardMap[j + 11 + h * 3] = [h + 2, k];
      }
    }

    for (var m = 0; m < 4; m++) {
      for (var n = 0, o = 1; n < 3; n++, o += 5) {
        this.boardMap[n + 34 + m * 3] = [m + 7, o];
      }
    }
  }

  getSquares() {
    return this.boardMap;
  }

  getPlayerPosition() {}

  setPlayerPosition() {}
}
