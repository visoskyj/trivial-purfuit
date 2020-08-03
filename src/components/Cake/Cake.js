
export default class Cake {
  pieces;
  colors;

  constructor() {
    this.colors = ["Red", "White", "Blue", "Green"];
    this.pieces = [];
  };
  
  addCakePiece(color) {
    if(this.pieces.includes(color))
      return
    this.pieces.push(color);
  }

  getCakePieces() {
    console.log("CAKE: gets pieces");
    return this.pieces;
  }
}