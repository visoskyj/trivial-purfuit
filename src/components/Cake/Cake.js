
export default class Cake {
  pieces;
  colors;

  constructor() {
    this.colors = ["Red", "White", "Blue", "Green"];
    this.pieces = [];
  };
  
  addPiece(color) {
    this.currentPieces.push(color);
  }

  getPieces() {
    console.log("CAKE: gets pieces");
    return this.pieces;
  }
}