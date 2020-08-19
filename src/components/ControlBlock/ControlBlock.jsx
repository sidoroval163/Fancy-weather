import React from 'react';
import { Refresher } from './components/Refresher/Refresher';
import { Language } from './components/Language/Language';
import { Temperature } from './components/Temperature/Temperature';
import { Search } from './components/Search/Search';
import "./ControlBlock.css";

//добавить сюда импорты всех кусочков

export const ControlBlock = () => {
    return (

        <div className="wrapperButtons">
            <Refresher />
            <Language />
            <Temperature />
        </div>





    )
}




