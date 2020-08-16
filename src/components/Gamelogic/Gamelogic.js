import QuestionsApi from "../../api/QuestionsApi";
import CategoryToColorMappingApi from "../../api/CategoryToColorMappingApi";
import GameApi from "../../api/GameApi";

export default class Gamelogic {

    constructor(props) {
        this.diceValue = 0;
        this.rolledDice = 0;
        this.currentCategory = "";
        this.peopleQuestions = [];
        this.eventQuestions = [];
        this.placesQuestions = [];
        this.holidayQuestions = [];
        this.currentPlayer = 0;

        console.info("Gamelogic: Initializing Questions resource");

        QuestionsApi.getAllQuestions().then(result => {
            console.log("Gamelogic: Successfully fetched all questions: ", result.data);
            this.questions = result.data;
            this.questions.forEach(qn => {
                if (qn.category === 'People') this.peopleQuestions.push(qn);
                else if (qn.category === 'Event') this.eventQuestions.push(qn);
                else if (qn.category === 'Places') this.placesQuestions.push(qn);
                else if (qn.category === 'Holiday') this.holidayQuestions.push(qn);
            })
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

    getRandomNum(upperBound) {
        return Math.floor(Math.random() * upperBound);
    }

    grabQuestion(category){
        console.info("Gamelogic: Grabbing a question for category ", category);
        if (category.includes('People')) return this.peopleQuestions[this.getRandomNum(this.peopleQuestions.length)];
        else if (category.includes('Events')) return this.eventQuestions[this.getRandomNum(this.eventQuestions.length)];
        else if (category.includes('Places')) return this.placesQuestions[this.getRandomNum(this.placesQuestions.length)];
        else if (category.includes('Holiday')) return this.holidayQuestions[this.getRandomNum(this.holidayQuestions.length)];
        //Return default question
        return this.questions[0];
    }


    // MOVE PLAYER TOKEN TO BOARD SPACE OF CHOICE
    async handleClick(i, category) {
        this.currentCategory = category;
        console.info("Gamelogic: Asking Board to move Player");
        await GameApi.movePlayer(i);

        if(category === "rollagain"){
            console.info("Gamelogic: Returning board to Client");
            return;
        }

        let question = this.grabQuestion(category);
        console.info("Gamelogic: Returning question and board to Client");
        return question;
    }

    async updateCurrentPlayer(){
        let data = await GameApi.updateTurn();
        this.currentPlayer = data.data.currentPlayer;
        return data.data;
    }

    async updateNumberPlayers(numPlayers){
        await GameApi.newGame(numPlayers);
    }

    async getNumberPlayers(){
        let allGames = await GameApi.allGames();
        return allGames.data.numPlayers;
    }


    // /game/cakes
    async getPlayerCakesArray(){
        let data = await GameApi.getPlayerCakes();
        return data.data.cake;
    }


    async getPlayerCakes(){
        await this.getCurrentPlayer();
        let data = await GameApi.getPlayerCakes();
        let cakesArray = data.data.cake.pieces;
        let cakesString = ''
        cakesArray.forEach(element => cakesString += element + ", "); 
        return cakesString.substring(0, cakesString.length - 2);
    }


    // game/updatecakes
    async updatePlayerCakes(color){
        await GameApi.updatePlayerCakes(color)
    }


    rollDice(){
        console.info("Gamelogic: Rolling the dice");
        this.diceValue = Math.floor(Math.random() * Math.floor(6)) + 1;
    }

    // GET DICE ROLL NUMBER AND SHOW SPACES WHERE PLAYER CAN MOVE
    async showBoardMove(player) {        
        console.info("Gamelogic: Beginning the move phase, player " + this.currentPlayer);
        await this.getCurrentPlayer();
        // RETURN IF PLAYER TRIES TO ROLL DICE WITHOUT SELECTING MOVE
        if(player !== this.currentPlayer)
            return;
        this.currentPlayer = -1;

        // GENERATE RANDOM DICE ROLL NUMBER
        this.rollDice();
        console.info("Gamelogic: Asking the Board to show valid moves");
        let board = await GameApi.playerMoves(this.diceValue);

        return board.data.board;
    }

    getConfiguration(){
        console.info("Gamelogic: Retrieving game configuration");
        console.info("Gamelogic: Calling Questions subsystem for configuration");
        console.info("Gamelogic: Response from Questions: " + QuestionsApi.getConfiguration() + ", Returning to caller");
        return "Client - [Playercount], Questions - [add, update]";
    }

    async updatePlayers(){
        console.info("Gamelogic: Asking the Board to update players");
        await GameApi.updatePlayers();
    }

    async getSquares(){
        console.info("Gamelogic: Asking the Board for board state");
        let allGames = await GameApi.allGames();
        
        console.info("Gamelogic: getSquares - Returning board state to caller");
        return allGames.data[allGames.data.length -1];
    }

    getDiceRoll() {
        console.info("Gamelogic: Returning dice roll to caller.");
        return this.diceValue;
    }

    async getCurrentPlayer() {
        let allGames = await GameApi.allGames();

        console.info("Gamelogic: Returning current player to caller");
        this.currentPlayer = allGames.data[allGames.data.length -1].currentPlayer;
        return allGames.data[allGames.data.length -1].currentPlayer;
    }
}