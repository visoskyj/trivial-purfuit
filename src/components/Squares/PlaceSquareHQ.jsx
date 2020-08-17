import React from 'react'

const PlaceSquare = (props) => {
    return (
        <button className="placeSquareHQ" onClick={props.onClick}>
            {props.value}
            <div className="containerbackground-lighttext">Places HQ</div>
        </button>
    );
}

export default PlaceSquare
