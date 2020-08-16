import React from 'react'
import { Link } from 'react-router-dom'
import Board from  '../Gameboard/Gameboard'
import Gamelogic from  '../../components/Gamelogic/Gamelogic'

import RollagainSquare from '../../components/Squares/RollagainSquare'
import PeopleSquare from '../../components/Squares/PeopleSquare'
import PlaceSquare from '../../components/Squares/PlaceSquare'
import EventSquare from '../../components/Squares/EventSquare'
import HolidaySquare from '../../components/Squares/HolidaySquare'
import HubSquare from '../../components/Squares/HubSquare'
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";



class Client extends React.Component {

    constructor(props) {
        console.info("Client constructor");
        super(props);
        this.game = new Gamelogic();
        this.diceValue = '';
        this.currentPlayerCakes = ''
        this.currentPlayer = 0;
        this.currentCategory = ''
        this.board = []
        this.turn = -1
    }

    async showBoardMove() {
        // IF NUMBER PLAYERS IS 0 DON'T PROCESS CLICK
        if(this.game.getNumberPlayers() === 0)
            return
        console.info("Client: Asking gamelogic to start a board move for player " + this.currentPlayer);
        this.board = await this.game.showBoardMove(this.currentPlayer);
        console.log("client showBoardMove")
        console.log(this.board)
        this.diceValue = this.game.getDiceRoll();        
        this.jumpTo();
    }

    getConfiguration(){
        console.info("Client: Asking gamelogic to give configuration.");
        let response = this.game.getConfiguration();
        console.info("Client: the configuration given is: " + response);
    }

    valid_answer(answer){
      if(/^[1-4]{1}$/.test(answer))
        return true
      else return false    
    }

    questionPrompt(question){
        let user_answer = prompt("Category is " + this.currentCategory + 
            "\n\n" + question["question"] + "\n\n" + 
            "1. " + question["answers"][0] + "\n\n" +
            "2. " + question["answers"][1] + "\n\n" +
            "3. " + question["answers"][2] + "\n\n" +
            "4. " + question["answers"][3] + "\n\n",
            "Give number of answer.");

        if(!this.valid_answer(user_answer) && user_answer != null){
          alert("Please enter a value, 1 - 4")
          this.questionPrompt(question);
        }
        let correct_answer = question["correctAnswer"];
        if(user_answer == correct_answer)
            return 'correct'
        else {
          return 'incorrect'
        }
    }

    async grantTokenCakes(i){        
        let category = this.currentCategory
        let color = ''

        switch(category) {
            case "Holiday HQ":
                color = "Green"
                break;
            case "Events HQ":
                color = "White"
                break;
            case "People HQ":
                color = "Red"
                break;
            case "Places HQ":
                color = "Blue"
                break; 
            case "Hub":
                const cakes = await this.game.getPlayerCakesArray()
                console.info(cakes)
                if(cakes.length === 4){
                    alert("You've won the game!")
                    this.initializeGame(); 
                }
                return;
            default:
                return
        }

        let playerTokenBefore = this.game.getPlayerCakes()
        await this.game.updatePlayerCakes(color)
        let playerTokenAfter = this.game.getPlayerCakes()

        if(playerTokenBefore !== playerTokenAfter)
            alert("You have won a cake piece!")

        return
    }

    async handleClick(i, category){
        console.info("Client: Asking gamelogic to move player.");
        
        // IGNORE CLICKS IF NOT ON SQUARE FOR POTENTIAL MOVE
        if (this.board[i] !== "O"){
            return;
        }
        
        this.currentCategory = category;

        let question;
        if(category === "Hub")
            question = await this.game.handleClick(i, "Event");
        else question = await this.game.handleClick(i, category);

        if(category === "rollagain"){
            alert("Please roll for another turn.");
        }
        else {
            console.info("Client: The category is - " + question["category"]);
            console.info("Client: The question is - " + question["question"]);
            console.info("Client: The answers are - " + question["answers"]);
            console.info("Client: The correct answer is - " + question["correctAnswer"]);
            
            if(this.questionPrompt(question) === "correct"){

                console.info('Client: Player provided answer is CORRECT!')
                
                this.grantTokenCakes()
                alert("Correct answer! Roll again.");
            }
            else {
                console.info('Client: Player provided answer is incorrect :(')
                alert("Incorrect answer. It's the next player's turn");
                let boardData = await this.game.updateCurrentPlayer();
                
                this.currentPlayer = boardData.currentPlayer;
                console.info('current player ' + this.currentPlayer)
            }
        }
        await this.game.updatePlayers();
        this.currentPlayer = await this.game.getCurrentPlayer();
        this.diceValue = '';
        this.currentPlayerCakes = await this.game.getPlayerCakes();
        this.jumpTo();
    }

    async getSquares(){
        console.info("Client: Asking gamelogic to provide updated board.");
        let boardData = await this.game.getSquares();
        console.info("boardData turn " + boardData.turn);
        console.info("this.turn " + this.turn);
        if(this.turn != boardData.turn && this.turn != -1)
        {
          console.info("updating board ");
          this.board = boardData.board;
          this.turn = boardData.turn;          
        }
        this.currentPlayerCakes = await this.game.getPlayerCakes();
        this.currentPlayer = boardData.currentPlayer;
        return this.board
    }

    resetGame(){
        console.log("resetting game");
        this.game = new Gamelogic();
        this.diceValue = '';
        this.currentPlayer = 0;
        this.currentCategory = '';
    }

    async initializeGame(){
      console.log("initializeGame");
        this.resetGame();
        let players = prompt("How many players would like to play?", "2 - 4")   
        if(/^[1-4]{1}$/.test(players) === false){
            alert("Please chose between 2 - 4 players please!");
            return;    
        }
        await this.game.updateNumberPlayers(players);
        await this.game.updatePlayers();
        let boardData = await this.game.getSquares();
        this.board = boardData.board;
        this.turn = boardData.turn;
        this.currentPlayerCakes = [];
        this.jumpTo();
    }

    async joinGame(){
      let boardData = await this.game.getSquares();
      this.board = boardData.board;
      this.turn = boardData.turn;
      this.currentPlayer = boardData.currentPlayer;
    }

    async update(){
      //await this.game.updatePlayers();
      await this.getSquares();
      console.log(this.board) 
      this.jumpTo(); 
    }

    jumpTo() {
        this.setState({
            stepNumber: 0
        });
    }

    componentDidMount() {
      setInterval(this.update.bind(this), 2000);
    }


    render() {
        return (
          <div className="game">
            <h2>Trivial Perfuit</h2>

            <div className="game-board">
              <Board
                squares={this.board}
                onClick={(i, category) => this.handleClick(i, category)}
              />
            </div>
            <div>
              <h3>Controls</h3>
              <Box display="flex" justifyContent={"space-between"}>
                <Button
                  variant={"contained"}
                  color={"primary"}
                  className={"local-button local-button--primary"}
                  onClick={() => this.initializeGame()}
                >
                  Setup Game
                </Button>  
                <Button
                  variant={"contained"}
                  color={"primary"}
                  className={"local-button local-button--primary"}
                  onClick={() => this.joinGame()}
                >
                  Join Game
                </Button>
                <Button
                  variant={"contained"}
                  color={"primary"}
                  className={"local-button local-button--primary"}
                  onClick={() => this.showBoardMove()}
                >
                  Roll Dice
                </Button>
                <Link to={'/config'}>
                <Button
                  variant={"contained"}
                  color={"primary"}
                  className={"local-button local-button--primary"}
                >
                  Configure Game
                </Button>
                </Link>
                
              </Box>
            </div>
            <div className="game-info">
              <h3>Game Info</h3>
              <Box
                display="flex"
                flexDirection={"column"}
                justifyContent={"space-between"}
              >
                <div>Dice Value: {this.diceValue}</div>
                <div>Current Player: {this.currentPlayer + 1}</div>
                <div>
                  Token cakes: {this.currentPlayerCakes}
                </div>
              </Box>
            </div>

            <div>
              <h3>Board Map</h3>
              <Box
                display="flex"
                justifyContent={"space-between"}
                margin={"16px 0"}
              >
                <span className="board-row">
                  <PlaceSquare id={"PlaceSquare"} />
                  <small>Places</small>
                </span>

                <span className="board-row">
                    <EventSquare />
                    <small>Events</small>
                </span>

                <span className="board-row">
                    <PeopleSquare />
                    <small>People</small>
                </span>

                <span className="board-row">
                    <HolidaySquare />
                    <small>Holiday</small>
                </span>

                <span className="board-row">
                    <RollagainSquare />
                    <small>Roll</small>
                </span>

                <span className="board-row">
                    <HubSquare />
                    <small>Hub</small>
                </span>
              </Box>
            </div>
          </div>
        );
    }
}

export default Client
