import Cake from './Cake';

export default class Token {
  id;
  cakePieces;

  constructor(id) {
    console.info("Token: initialized");
    this.id = id;
    this.cakePieces = new Cake();
  }

  getId() {
    return this.id;
  }
  
  addCakePiece(color) {
    // calls cake.addPieces()
    this.cakePieces.addCakePiece(color);
  }

  getCakePieces() {
    // calls cake.getPieces()
    return this.cakePieces.getPieces();
  }
}

