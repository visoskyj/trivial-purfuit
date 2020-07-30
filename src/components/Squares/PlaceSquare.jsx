import React from 'react'

const PlaceSquare = (props) => {
    return (
        <button className="placeSquare" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default PlaceSquare
