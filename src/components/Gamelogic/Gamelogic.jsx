import Board from '../Gameboard/Gameboard'


class Gamelogic{

    constructor(props) {
        console.info("Gamelogic: Initializing a new Board state");
        this.board = new Board();
        this.diceValue = "";
        this.rolledDice = "";
        this.currentPlayer = this.board.getCurrentPlayer();
    }

    // MOVE PLAYER TOKEN TO BOARD SPACE OF CHOICE
    handleClick(i) {
        console.info("Gamelogic: Asking Board to move Player");
        this.board.movePlayer(i);
    }

    rollDice(){
        console.info("Gamelogic: Rolling the dice");
        this.diceValue = Math.floor(Math.random() * Math.floor(6)) + 1;
    }

    // GET DICE ROLL NUMBER AND SHOW SPACES WHERE PLAYER CAN MOVE
    showBoardMove(player) {
        console.info("Gamelogic: Beginning the move phase");
        // RETURN IF PLAYER TRIES TO ROLL DICE WITHOUT SELECTING MOVE
        if(player !== this.currentPlayer)
        {
            return;
        }
        this.currentPlayer = -1;
        // GENERATE RANDOM DICE ROLL NUMBER
        this.rollDice();
        console.info("Gamelogic: Asking the Board to show valid moves");
        this.board.getValidMove(this.diceValue)
        this.rolledDice = this.board.currentPlayer;
    }

    getConfiguration(){
        console.info("Gamelogic: Retrieving game configuration");
        console.info("Gamelogic: Calling Questions subsystem for configuration");

        // TODO add call

        // TODO add mock return

    }

    updatePlayers(){
        console.info("Gamelogic: Asking the Board to update players");
        this.board.updatePlayers();
    }

    getSquares(){
        console.info("Gamelogic: Asking the Board for board state");
        let state = this.board.getBoardState();
        console.info("Gamelogic: Returning board state to caller");
        return state;
    }

    getDiceRoll() {
        console.info("Gamelogic: Returning dice roll to caller.");
        return this.diceValue;
    }

    getCurrentPlayer() {
        console.info("Gamelogic: Asking the Board for current player");
        this.currentPlayer = this.board.getCurrentPlayer();
        console.info("Gamelogic: Returning current player to caller");
        return this.currentPlayer;
    }
}

export default Gamelogic