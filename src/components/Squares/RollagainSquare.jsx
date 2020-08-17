import React from 'react'

const RollagainSquare = (props) => {
    return (
        <button className="rollagainSquare" onClick={props.onClick}>
            {props.value}<div className="containerbackground">Roll Again</div>
        </button>
    );
}

export default RollagainSquare
