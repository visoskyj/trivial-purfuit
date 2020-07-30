import React from 'react'

const EventSquare = (props) => {
    return (
        <button className="eventSquare" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default EventSquare
