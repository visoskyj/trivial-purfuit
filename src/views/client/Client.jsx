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
import Dialog from "@material-ui/core/Dialog";
import Dice1 from './dice-1.png'
import Dice2 from './dice-2.png'
import Dice3 from './dice-3.png'
import Dice4 from './dice-4.png'
import Dice5 from './dice-5.png'
import Dice6 from './dice-6.png'

class Client extends React.Component {

    constructor(props) {
        super(props);
        console.info("Client: 'creating' connection to gamelogic subsystem.");
        this.game = new Gamelogic();
        this.diceValue = '';
        this.diceImage = '';

        console.info("Client: Asking gamelogic for current player.");
        this.currentPlayerCakes = '';
        this.currentPlayer = '';
        this.currentCategory = '';
        this.openErrorModal = false;
        this.alertMessage = '';
        this.showInfo = false
    }


    setDiceImage(){
        switch(this.diceValue) {
            case 1:
                this.diceImage = Dice1
                break;
            case 2:
                this.diceImage = Dice2
                break;
            case 3:
                this.diceImage = Dice3
                break;
            case 4:
                this.diceImage = Dice4
                break;
            case 5:
                this.diceImage = Dice5
                break;
            case 6:
                this.diceImage = Dice6
                break;              
            default:
                this.diceImage = ''
        }
    }


    showBoardMove() {
        // IF NUMBER PLAYERS IS 0 DON'T PROCESS CLICK
        if(this.game.getNumberPlayers() === 0)
            return;
        console.info("Client: Asking gamelogic to start a board move.");
        this.game.showBoardMove(this.currentPlayer);
        this.diceValue = this.game.getDiceRoll();   
        this.setDiceImage();     
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
            this.setModalVisible(true,"Please enter a value, 1 - 4");
          this.questionPrompt(question);
        }
        let correct_answer = question["correctAnswer"];
        if(user_answer == correct_answer)
            return 'correct'
        else return 'incorrect'
    }

    grantTokenCakes(i){
        
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
                const cakes = this.game.getPlayerCakesArray()
                console.info(cakes)
                if(cakes.length === 4){
                    this.setModalVisible(true,"You've won the game!");
                    // this.initializeGame(); 
                }
                return 'win';
            default:
                return
        }

        let playerTokenBefore = this.game.getPlayerCakes()
        this.game.updatePlayerCakes(color)
        let playerTokenAfter = this.game.getPlayerCakes()

        if(playerTokenBefore !== playerTokenAfter)
            this.setModalVisible(true,"You have won a cake piece!");

        return
    }

    handleClick(i, category){
        console.info("Client: Asking gamelogic to move player.");
        
        // IGNORE CLICKS IF NOT ON SQUARE FOR POTENTIAL MOVE
        if (this.game.board.squares[i] !== "O")
            return;
        
        this.currentCategory = category;

        let question;
        if(category == "Hub")
            question = this.game.handleClick(i, "Event");
        else question = this.game.handleClick(i, category);

        if(category === "rollagain"){
            this.setModalVisible(true,"Please roll for another turn.");
        }
        else {
            console.info("Client: The category is - " + question["category"]);
            console.info("Client: The question is - " + question["question"]);
            console.info("Client: The answers are - " + question["answers"]);
            console.info("Client: The correct answer is - " + question["correctAnswer"]);
            
            if(this.questionPrompt(question) == "correct"){

                console.info('Client: Player provided answer is CORRECT!')
                
                if (this.grantTokenCakes() == 'win'){
                    var delayInMilliseconds = 5000; //1 second

                    setTimeout(function() {
                        window.location.reload();
                    }, delayInMilliseconds);
                    
                }
                else this.setModalVisible(true,"Correct answer! Roll again.");

            }
            else {
                console.info('Client: Player provided answer is incorrect :(')
                this.setModalVisible(true,"Incorrect answer. It's the next player's turn");
                this.game.updateCurrentPlayer()
            }
        }
        this.currentPlayer = this.game.getCurrentPlayer();
        this.diceValue = ''
        this.diceImage = ''      
        this.currentPlayerCakes = this.game.getPlayerCakes() 
        this.currentCakeArray = this.game.getPlayerCakesArray() 
        this.showCakeTokens()
        this.jumpTo();
    }


    showCakeTokens(){
        if(this.currentCakeArray.includes('Blue'))
            this.placesCake = '•'
        else this.placesCake = null

        if(this.currentCakeArray.includes('Red'))
            this.peopleCake = '•'
        else this.peopleCake = null

        if(this.currentCakeArray.includes('Green'))
            this.holidayCake = '•'
        else this.holidayCake = null

        if(this.currentCakeArray.includes('White'))
            this.eventsCake = '•'
        else this.eventsCake = null

    }


    getSquares(){
        console.info("Client: Asking gamelogic to provide updated board.");
        return this.game.getSquares();
        this.setDiceImage()
    }

    resetGame(){
        this.game = new Gamelogic();
        this.diceValue = '';
        this.diceImage = '';
        this.eventsCake = null;
        this.placesCake = null;
        this.holidayCake = null;
        this.peopleCake = null;
        console.info("Client: Asking gamelogic for current player.");
        this.currentPlayer = this.game.getCurrentPlayer();
        this.currentCategory = '';
    }

    initializeGame(){
        this.resetGame();

        let players = prompt("How many players would like to play?", "2 - 4")   
        if(/^[1-4]{1}$/.test(players) == false){
            this.setModalVisible(true,"Please chose between 2 - 4 players please!");
        } else {
            this.game.updateNumberPlayers(players)
            this.game.updatePlayers();
            this.currentPlayerCakes = this.game.getPlayerCakes()

            this.jumpTo();
        }
    }

    jumpTo() {
        this.setState({
            stepNumber: 0
        });
    }


    setModalVisible (visible, message) {
        this.openErrorModal = visible;
        this.alertMessage = message;
        this.jumpTo();
    }

    render() {

        this.game.updatePlayers();
        console.log(this.currentPlayerCakes)



        return (
          <div className="game">
            <h2>Trivial Perfuit</h2>

            <div className="game-board">
              <Board
                squares={this.getSquares()}
                onClick={(i, category) => this.handleClick(i, category)}
              />
            </div>
            <div>
              <h3>Controls</h3>
              {/* <Box display="flex" justifyContent={"space-between"} style={{marginBottom: "12px"}}> */}
              <Button
                variant={"contained"}
                style={{ marginBottom: "12px", width: "100%" }}
                color={"primary"}
                className={
                  "local-button local-button--primary local-button--large"
                }
                onClick={() => this.showBoardMove()}
              >
                Roll Dice 🎲
              </Button>
              
              {/* </Box> */}
              <Box display="flex" justifyContent={"space-between"}>
              
                <Button
                  variant={"contained"}
                  color={"primary"}
                  style={{ flexGrow: "1" }}
                  className={"local-button "}
                  onClick={() => this.initializeGame()}
                >
                  Setup Game
                </Button>
              
                <Link
                  to={"/config"}
                  style={{ flexGrow: "1", marginLeft: "8px" }}
                >
                  <Button
                    variant={"contained"}
                    color={"primary"}
                    style={{ width: "100%" }}
                    className={"local-button "}
                  >
                    Configure Game
                  </Button>

                </Link>

      
                  <Button
                    variant={"contained"}
                    color={"primary"}
                    style={{ marginLeft: "8px"  }}
                    className={"local-button "}
                    onClick={() => alert('No game sessions found.')}
                  >
                    Join Game
                  </Button>

              </Box>
            </div>
            <div className="game-info">
              <h3>Game Info</h3>
              <Box
                display="flex"
                flexDirection={"column"}
                justifyContent={"space-between"}
              >
                <div>Current Player: {this.currentPlayer}</div>
                <div>Dice Value: {this.diceValue}</div>
                <div>Token cakes:</div>
                <div className="colorDots">
                  <span className="placesCake">{this.placesCake}</span>
                  <span className="peopleCake">{this.peopleCake}</span>
                  <span className="holidayCake">{this.holidayCake}</span>
                  <span className="eventsCake">{this.eventsCake}</span>
                </div>
                
                <div className='diceImg'><img src={this.diceImage} alt="" /></div>
              </Box>
            </div>

            <Dialog
              open={this.openErrorModal}
              onClose={() => this.setModalVisible(false, "")}
              aria-labelledby="form-dialog-title"
            >
              <Box display="flex" justifyContent={"space-between"}>
                <p style={{ margin: "40px" }}>{this.alertMessage}</p>
              </Box>
            </Dialog>
          </div>
        );
    }
}

export default Client
