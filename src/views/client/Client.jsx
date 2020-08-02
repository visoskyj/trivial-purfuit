import React from 'react'
import Board from  '../Gameboard/Gameboard'
import Gamelogic from  '../../components/Gamelogic/Gamelogic'

import RollagainSquare from '../../components/Squares/RollagainSquare'
import PeopleSquare from '../../components/Squares/PeopleSquare'
import PlaceSquare from '../../components/Squares/PlaceSquare'
import EventSquare from '../../components/Squares/EventSquare'
import HolidaySquare from '../../components/Squares/HolidaySquare'
import HubSquare from '../../components/Squares/HubSquare'


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
        const diceRollButton =
            <li>
                <button onClick={() => this.showBoardMove()}>Roll Dice</button>
            </li>

        // const initGameButton =
        //     <li>
        //         <button onClick={() => this.game.updatePlayers()}>Initialize Game</button>
        //     </li>

        const configButton = 
            <li>
                <button onClick={() => this.getConfiguration()}>Configure game</button>
            </li>            

        let displayRoll, displayPlayer;
        displayRoll = "Dice Roll: " + this.diceValue;
        displayPlayer = "Current Player: " + this.currentPlayer;
        

        var tokenContent = "Player " + this.currentPlayer + 
                           " token: " + "Red, Blue, White"
    

        this.game.updatePlayers();

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={this.getSquares()}
                        onClick={(i, category) => this.handleClick(i, category)}
                    />
                </div>
                <div className="game-info">
                    <div>{displayRoll}</div>
                    <div>{displayPlayer}</div>
                    <div>{tokenContent}</div>
                    <ul>
                        {diceRollButton}
                    </ul>
                    {/*<ul>
                        {initGameButton}
                    </ul>*/}
                    <ul>
                        {configButton}
                    </ul>
                </div>
                Places Category
                <div className="board-row">
                    <PlaceSquare />
                </div>
                Events Category
                <div className="board-row">
                    <EventSquare />
                </div>
                People Category
                <div className="board-row">
                    <PeopleSquare />
                </div>
                Holiday Category
                <div className="board-row">
                    <HolidaySquare />
                </div>
                Roll Again
                <div className="board-row">
                    <RollagainSquare />
                </div>
                Hub Square
                <div className="board-row">
                    <HubSquare />
                </div>

            </div>
        );
    }
}

export default Client
