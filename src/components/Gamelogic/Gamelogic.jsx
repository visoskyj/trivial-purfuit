import Board from '../Gameboard/Gameboard'
import QuestionsApi from "../../api/QuestionsApi";
import CategoryToColorMappingApi from "../../api/CategoryToColorMappingApi";


class Gamelogic{

    constructor(props) {
        console.info("Gamelogic: Initializing a new Board state");
        this.board = new Board();
        this.diceValue = "";
        this.rolledDice = "";
        this.currentPlayer = this.board.getCurrentPlayer();

        console.info("Gamelogic: Initializing Questions resource");
        QuestionsApi.getAllQuestions().then(result => {
            console.log("Gamelogic: Successfully fetched all questions: ", result.data);
            this.questions = result.data;
        }).catch(error => {
            console.warn("Gamelogic: Failed to fetch all questions with error ", error.toString());
        });

        CategoryToColorMappingApi.getAllCategoryToColorMappings().then(result => {
            console.log("DB: Successfully fetched all category to color mappings: ", result.data);
            this.categoryToColorMappings = result.data;
        }).catch(error => {
            console.warn("DB: Failed to fetch all category to color mappings with error ", error.toString());
        });
    }

    grabQuestion(category){
        //TODO: actually pass in category
        console.info("Gamelogic: Grabbing a question");
        return this.questions[0];
    }


    // MOVE PLAYER TOKEN TO BOARD SPACE OF CHOICE
    handleClick(i) {
        console.info("Gamelogic: Asking Board to move Player");
        this.board.movePlayer(i);
        let question = this.grabQuestion("Red");
        console.info("Gamelogic: Returning question to Client");
        return question;
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
        console.info("Gamelogic: Response from Questions: " + QuestionsApi.getConfiguration() + ", Returning to caller");
        return "Client - [Playercount], Questions - [add, update]";
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