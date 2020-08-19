import React from 'react';
import "./Longitude.css";
export const Longitude = (props) => {
    const Longitud = (props) => (props === "ru") ? 'Долгота:' : 'Longitude:';

    return (

        <div className="longitude_info">
            {Longitud(props.lang)} {props.lat}
        </div>

    );
};