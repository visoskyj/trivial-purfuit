import React from 'react'

const PeopleSquare = (props) => {
    return (
        <button className="peopleSquareHQ" onClick={props.onClick}>
            {props.value}
            <div className="containerbackground-lighttext">People HQ</div>
        </button>
    );
}

export default PeopleSquare
