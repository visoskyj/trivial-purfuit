import React from 'react'
import BlankSquare from '../../components/Squares/BlankSquare'
import RollagainSquare from '../../components/Squares/RollagainSquare'
import PeopleSquare from '../../components/Squares/PeopleSquare'
import PlaceSquare from '../../components/Squares/PlaceSquare'
import EventSquare from '../../components/Squares/EventSquare'
import HolidaySquare from '../../components/Squares/HolidaySquare'
import HubSquare from '../../components/Squares/HubSquare'

class Board extends React.Component {

    renderRollagainSquare(i) {
        return (
            <RollagainSquare
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i, "rollagain")}
            />
        );
    }

    renderHubSquare(i) {
        return (
            <HubSquare
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i, "Hub")}
            />
        );
    }

    renderPeopleSquare(i) {
        var category = "People"
        if (i == 33)
            category = "People HQ"
        return (
            <PeopleSquare
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i, category)}
            />
        );
    }

    renderEventSquare(i) {
        var category = "Events"
        if (i == 23)
            category = "Events HQ"
        return (
            <EventSquare
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i, category)}
            />
        );
    }

    renderHolidaySquare(i) {
        var category = "Holiday"
        if (i == 51)
            category = "Holiday HQ"
        return (
            <HolidaySquare
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i, category)}
            />
        );
    }

    renderPlaceSquare(i) {
        var category = "Places"
        if (i == 5)
            category = "Places HQ"
        return (
            <PlaceSquare
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i, category)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderEventSquare(0)}
                    {this.renderPlaceSquare(1)}
                    {this.renderRollagainSquare(2)}
                    {this.renderHolidaySquare(3)}
                    {this.renderEventSquare(4)}
                    {this.renderPlaceSquare(5)}
                    {this.renderPeopleSquare(6)}
                    {this.renderRollagainSquare(7)}
                    {this.renderEventSquare(8)}
                    {this.renderHolidaySquare(9)}
                    {this.renderPeopleSquare(10)}
                    {/*<BlankSquare />
                    {this.renderPlaceSquare(57)}Place*/}

                </div>
                <div className="board-row">
                    {this.renderHolidaySquare(11)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderEventSquare(12)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderHolidaySquare(13)}
                </div>
                <div className="board-row">
                    {this.renderRollagainSquare(14)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderPlaceSquare(15)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderEventSquare(16)}
                </div>
                <div className="board-row">
                    {this.renderPeopleSquare(17)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderPeopleSquare(18)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderRollagainSquare(19)}
                </div>
                <div className="board-row">
                    {this.renderPlaceSquare(20)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderHolidaySquare(21)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderPlaceSquare(22)}
                </div>
                <div className="board-row">
                    {this.renderEventSquare(23)}
                    {this.renderPeopleSquare(24)}
                    {this.renderHolidaySquare(25)}
                    {this.renderEventSquare(26)}
                    {this.renderPlaceSquare(27)}
                    {this.renderHubSquare(28)}
                    {this.renderPeopleSquare(29)}
                    {this.renderHolidaySquare(30)}
                    {this.renderPlaceSquare(31)}
                    {this.renderEventSquare(32)}
                    {this.renderPeopleSquare(33)}
                </div>
                <div className="board-row">
                    {this.renderHolidaySquare(34)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderEventSquare(35)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderHolidaySquare(36)}
                </div>
                <div className="board-row">
                    {this.renderRollagainSquare(37)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderPeopleSquare(38)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderEventSquare(39)}
                </div>
                <div className="board-row">
                    {this.renderPeopleSquare(40)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderHolidaySquare(41)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderRollagainSquare(42)}
                </div>
                <div className="board-row">
                    {this.renderPlaceSquare(43)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderPlaceSquare(44)}
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    <BlankSquare />
                    {this.renderPeopleSquare(45)}
                </div>
                <div className="board-row">
                    {this.renderHolidaySquare(46)}
                    {this.renderPeopleSquare(47)}
                    {this.renderPlaceSquare(48)}
                    {this.renderRollagainSquare(49)}
                    {this.renderEventSquare(50)}
                    {this.renderHolidaySquare(51)}
                    {this.renderPeopleSquare(52)}
                    {this.renderPlaceSquare(53)}
                    {this.renderRollagainSquare(54)}
                    {this.renderEventSquare(55)}
                    {this.renderPlaceSquare(56)}
                </div>
            </div>
        );
    }
}

export default Board
