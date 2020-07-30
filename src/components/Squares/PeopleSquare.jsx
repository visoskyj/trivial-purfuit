import React from 'react'

const PeopleSquare = (props) => {
    return (
        <button className="peopleSquare" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default PeopleSquare
