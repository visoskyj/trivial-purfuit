import React from 'react'

const Square1 = (props) => {
    return (
        <button className="square1" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square1
