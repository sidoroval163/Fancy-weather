import React from 'react';
import "./Attitude.css";
export const Attitude = (props) => {
    const attitud = (props) => (props === "ru") ? 'Широта:' : 'Attitude:';


    return (

        <div className="attitude_info">
            {attitud(props.lang)} {props.lng}
        </div>

    );
};