import React from 'react'
import Board from  '../Gameboard/Gameboard'
import Gamelogic from  '../../components/Gamelogic/Gamelogic'


class Client extends React.Component {

    constructor(props) {
        super(props);
        console.info("Client: 'creating' connection to gamelogic subsystem.");
        this.game = new Gamelogic();
        this.diceValue = '';
        console.info("Client: Asking gamelogic for current player.");
        this.currentPlayer = this.game.getCurrentPlayer();
    }

    showBoardMove() {
        console.info("Client: Asking gamelogic to start a board move.");
        this.game.showBoardMove(this.currentPlayer);
        this.diceValue = this.game.getDiceRoll();        
        this.jumpTo();
    }

    getConfiguration(){
        console.info("Client: Asking gamelogic to give configuration.");
        this.game.getConfiguration();
    }

    handleClick(i){
        console.info("Client: Asking gamelogic to move player.");
        this.game.handleClick(i);
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

        const configButton =
            <li>
                <button onClick={() => this.getConfiguration()}>Configure game</button>
            </li>            

        let displayRoll, displayPlayer;
        displayRoll = "Dice Roll: " + this.diceValue;
        displayPlayer = "Current Player: " + this.currentPlayer;

        this.game.updatePlayers();

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={this.getSquares()}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{displayRoll}</div>
                    <div>{displayPlayer}</div>
                    <ul>
                        {diceRollButton}
                    </ul>
                    <ul>
                        {configButton}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Client
