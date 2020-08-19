import React from 'react';
import "./Temperature.css";
export const Temperature = (props) => {
    return (

        <div className="wrapper-radio_btns">
            <div className="button_farenheit focused_temp" id="farenheitButton"></div>
            <div className="button_celsium" id="celsiumButton"></div>
        </div>

    );
};