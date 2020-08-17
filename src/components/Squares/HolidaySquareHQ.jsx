import React from 'react'

const HolidaySquare = (props) => {
    return (
        <button className="holidaySquare" onClick={props.onClick}>
            {props.value}
            <div className="containerbackground-darktext">Holiday HQ</div>
        </button>
    );
}

export default HolidaySquare
