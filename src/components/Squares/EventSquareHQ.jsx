import React from 'react'

const EventSquare = (props) => {
    return (
        <button className="eventSquare" onClick={props.onClick}>
            {props.value}
            <div className="containerbackground-darktext">Events HQ</div>
        </button>
    );
}

export default EventSquare
