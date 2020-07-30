import React from 'react'

const RollagainSquare = (props) => {
    return (
        <button className="rollagainSquare" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default RollagainSquare
