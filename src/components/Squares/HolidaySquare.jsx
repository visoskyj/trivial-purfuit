import React from 'react'

const HolidaySquare = (props) => {
    return (
        <button className="holidaySquare" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default HolidaySquare
