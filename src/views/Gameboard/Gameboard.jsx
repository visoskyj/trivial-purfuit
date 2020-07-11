import React from 'react'
import Square1 from '../../components/Squares/Square1'
import Square2 from '../../components/Squares/Square2'
import BlankSquare from '../../components/Squares/BlankSquare'

class Board extends React.Component {

    renderSquare1(i) {
        return (
            <Square1
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    renderSquare2(i) {
        return (
            <Square2
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare2(0)}
                    {this.renderSquare1(1)}
                    {this.renderSquare2(2)}
                    {this.renderSquare1(3)}
                    {this.renderSquare2(4)}
                    {this.renderSquare1(5)}
                    {this.renderSquare2(6)}
                    {this.renderSquare1(7)}
                    {this.renderSquare2(8)}
                    {this.renderSquare1(9)}
                    {this.renderSquare2(10)}
                </div>
                <div className="board-row">
                    {this.renderSquare1(11)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderSquare2(12)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderSquare1(13)}
                </div>
                <div className="board-row">
                    {this.renderSquare2(14)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderSquare1(15)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderSquare2(16)}
                </div>
                <div className="board-row">
                    {this.renderSquare1(17)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderSquare2(18)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderSquare1(19)}
                </div>
                <div className="board-row">
                    {this.renderSquare2(20)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderSquare1(21)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderSquare2(22)}
                </div>
                <div className="board-row">
                    {this.renderSquare1(23)}
                    {this.renderSquare2(24)}
                    {this.renderSquare1(25)}
                    {this.renderSquare2(26)}
                    {this.renderSquare1(27)}
                    {this.renderSquare2(28)}
                    {this.renderSquare1(29)}
                    {this.renderSquare2(30)}
                    {this.renderSquare1(31)}
                    {this.renderSquare2(32)}
                    {this.renderSquare1(33)}
                </div>
                <div className="board-row">
                    {this.renderSquare2(34)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderSquare1(35)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderSquare2(36)}
                </div>
                <div className="board-row">
                    {this.renderSquare1(37)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderSquare2(38)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderSquare1(39)}
                </div>
                <div className="board-row">
                    {this.renderSquare2(40)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderSquare1(41)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderSquare2(42)}
                </div>
                <div className="board-row">
                    {this.renderSquare1(43)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderSquare2(44)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderSquare1(45)}
                </div>
                <div className="board-row">
                    {this.renderSquare2(46)}
                    {this.renderSquare1(47)}
                    {this.renderSquare2(48)}
                    {this.renderSquare1(49)}
                    {this.renderSquare2(50)}
                    {this.renderSquare1(51)}
                    {this.renderSquare2(52)}
                    {this.renderSquare1(53)}
                    {this.renderSquare2(54)}
                    {this.renderSquare1(55)}
                    {this.renderSquare2(56)}
                </div>
            </div>
        );
    }
}

export default Board
