import React from 'react'

const HubSquare = (props) => {
    return (
        <button className="hubSquare" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default HubSquare
