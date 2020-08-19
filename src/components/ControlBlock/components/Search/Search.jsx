import React from 'react';
import "./Search.css";
export const Search = (props) => {
    return (
        <div className="wrapper_search">
            <input className="input_base" type="search" placeholder="Search city"></input>
            <div className="btn_voice" > <img className="voice_icon" src="/source/components/Images/voice_icon.svg" alt="voice"></img></div>
            <div className="btn-search"> SEARCH </div>

        </div >
    );
};
