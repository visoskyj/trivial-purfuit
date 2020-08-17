import React from 'react'

const HubSquare = (props) => {
    return (
        <button className="hubSquare" onClick={props.onClick}>
            {props.value}<div className="containerbackground-hub">HUB</div>
        </button>
    );
}

export default HubSquare
