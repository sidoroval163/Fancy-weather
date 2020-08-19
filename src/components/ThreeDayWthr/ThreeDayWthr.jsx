import React from 'react';



import ReactAnimatedWeather from 'react-animated-weather';

import "./ThreeDayWthr.css";
const getNameOfIcon = (description) => {
    let name;
    switch (description) {
        case 'Clouds':
            name = 'CLOUDY'
            break;
        case 'Rain':
            name = 'RAIN'
            break;


        default:
            name = 'CLEAR_DAY'
            break;
    }
    return name;
}
const hotOrCold = (temperature) => {
    if (temperature > 0) { return '+' + temperature; }
    else if (temperature < 0) { return '-' + temperature; }
    else { return temperature }
};

export class ThreeDayWthr extends React.Component {



    render() {

        const weatherNow1 = Math.round(this.props.threeDayWeather[0].main.temp);
        const weatherNow2 = Math.round(this.props.threeDayWeather[1].main.temp);
        const weatherNow3 = Math.round(this.props.threeDayWeather[2].main.temp);
        const daymaker = (here, props) => {
            if (props === "ru") {
                const Days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

                let number = new Date(here).getDay();
                return Days[number]
            }
            else if (props === "en") {
                const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

                let number = new Date(here).getDay();
                return Days[number]
            }
        }


        return <div className="weather_days_block">
            <div className="day_block">
                <div className="weekdayText">{daymaker(this.props.threeDayWeather[0].dt_txt, this.props.lang)}</div>
                <div className="weekdayTemp">{hotOrCold(weatherNow1)}°</div>
                <div className="weatherPic"><ReactAnimatedWeather icon={getNameOfIcon(this.props.threeDayWeather[0].weather[0].main)}
                    color={'LemonChiffon'}
                    size={60}
                    animate={true} /></div>

            </div>
            <div className="day_block">
                <div className="weekdayText">{daymaker(this.props.threeDayWeather[1].dt_txt, this.props.lang)}</div>
                <div className="weekdayTemp">{hotOrCold(weatherNow2)}°</div>
                <div className="weatherPic"><ReactAnimatedWeather icon={getNameOfIcon(this.props.threeDayWeather[1].dt_txt, this.props.lang)}
                    color={'LemonChiffon'}
                    size={60}
                    animate={true} /></div>

            </div>
            <div className="day_block">
                <div className="weekdayText">{daymaker(this.props.threeDayWeather[2].dt_txt, this.props.lang)}</div>
                <div className="weekdayTemp">{hotOrCold(weatherNow3)}°</div>
                <div className="weatherPic"><ReactAnimatedWeather icon={getNameOfIcon(this.props.threeDayWeather[2].dt_txt, this.props.lang)}
                    color={'LemonChiffon'}
                    size={60}
                    animate={true} /></div>
            </div>


        </div >

    };

}








