import React from 'react';
import "./DateTime.css";
export const DateTime = (props) => {
    return (
        <div className="datetime">
            <h1 >Время и дата{props.location}</h1>
        </div>
    );
};