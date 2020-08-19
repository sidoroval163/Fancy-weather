import React from 'react';
import { Location } from './components/Location/Location';

import { TemperatureToday } from './components/TemperatureToday/TemperatureToday';


import "./WeatherToday.css";




export class WeatherToday extends React.Component {
    constructor() {
        super();
        this.state = {
            time: new Date().toLocaleString()
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }


    tick() {
        this.setState({
            time: new Date().toLocaleString(),
        });
    }
    render() {

        return <div className="weather_today_block">
            <Location city={this.props.temper.name} />
            <div className="datetime"> {this.state.time}</div>
            <TemperatureToday tempNow={this.props.temper} lang={this.props.lang} />


        </div>;
    }
}


