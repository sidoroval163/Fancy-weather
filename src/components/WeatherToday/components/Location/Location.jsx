import React from 'react';
import "./Location.css";
export const Location = (props) => {
    return (
        <div className="location">
            <h1 >{props.city}</h1>
        </div>
    );
};