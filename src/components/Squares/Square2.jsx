import React from 'react'

const Square2 = (props) => {
    return (
        <button className="square2" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square2
