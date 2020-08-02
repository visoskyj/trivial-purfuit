import React from 'react'
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
        super(props);
        console.info("Client: 'creating' connection to gamelogic subsystem.");
        this.game = new Gamelogic();
        this.diceValue = '';
        console.info("Client: Asking gamelogic for current player.");
        this.currentPlayer = this.game.getCurrentPlayer();
        this.currentCategory = ''
    }

    showBoardMove() {
        console.info("Client: Asking gamelogic to start a board move.");
        this.game.showBoardMove(this.currentPlayer);
        this.diceValue = this.game.getDiceRoll();        
        this.jumpTo();
    }

    getConfiguration(){
        console.info("Client: Asking gamelogic to give configuration.");
        let response = this.game.getConfiguration();
        console.info("Client: the configuration given is: " + response);
    }

    questionPrompt(question){
        let user_answer = prompt("Category is " + this.currentCategory + 
            "\n\n" + question["question"] + "\n\n" + 
            "1. " + question["answers"][0] + "\n\n" +
            "2. " + question["answers"][1] + "\n\n" +
            "3. " + question["answers"][2] + "\n\n", 
            "Give number of answer.");

        // let correct_answer = question["correct_answer"]
        let correct_answer = '1'
        if(user_answer == correct_answer)
            return 'correct'
        else return 'incorrect'
    }

    handleClick(i, category){
        console.info("Client: Asking gamelogic to move player.");
        
        // IGNORE CLICKS IF NOT ON SQUARE FOR POTENTIAL MOVE
        if (this.game.board.squares[i] !== "O")
            return;
        
        this.currentCategory = category;
        let question = this.game.handleClick(i, category);

        if(category == "rollagain"){
            alert("Please roll for another turn.");
        }
        else {
            console.info("Client: The category is - " + question["category"]);
            console.info("Client: The question is - " + question["question"]);
            console.info("Client: The answers are - " + question["answers"]);
            
            if(this.questionPrompt(question) == "correct"){
                console.info('Client: Player provided answer is CORRECT!')
                alert("Correct answer!\nRoll for another turn.");
            }
            else {
                console.info('Client: Player provided answer is incorrect :(')
                this.game.updateCurrentPlayer()
            }
        }
        this.currentPlayer = this.game.getCurrentPlayer();
        this.jumpTo();
    }

    getSquares(){
        console.info("Client: Asking gamelogic to provide updated board.");
        return this.game.getSquares();
    }

    jumpTo() {
        this.setState({
            stepNumber: 0
        });
    }

    render() {

        this.game.updatePlayers();

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
              <Box display="flex" justifyContent={"space-between"}>
                <Button
                  variant={"contained"}
                  color={"primary"}
                  className={"local-button local-button--primary"}
                  onClick={() => this.showBoardMove()}
                >
                  Roll Dice
                </Button>
                <Button
                  variant={"contained"}
                  color={"primary"}
                  className={"local-button local-button--primary"}
                  onClick={() => this.getConfiguration()}
                >
                  Configure Game
                </Button>
                <Button
                  variant={"contained"}
                  color={"primary"}
                  className={"local-button local-button--primary"}
                  onClick={() => this.game.updatePlayers()}
                >
                  Initialize Game
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
                <div>Dice Value: {this.diceValue}</div>
                <div>Current Player: {this.currentPlayer}</div>
                <div>
                  Player {this.currentPlayer} token: Red, Blue, White
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
                  <small>Places Category</small>
                </span>

                <span className="board-row">
                    <EventSquare />
                    <small>Events Category</small>
                </span>

                <span className="board-row">
                    <PeopleSquare />
                    <small>People Category</small>
                </span>

                <span className="board-row">
                    <HolidaySquare />
                    <small>Holiday Category</small>
                </span>

                <span className="board-row">
                    <RollagainSquare />
                    <small>Roll Again</small>
                </span>

                <span className="board-row">
                    <HubSquare />
                    <small>Hub Square</small>
                </span>
              </Box>
            </div>
          </div>
        );
    }
}

export default Client
