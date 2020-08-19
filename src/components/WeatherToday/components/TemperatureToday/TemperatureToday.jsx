import React from 'react';
import "./TemperatureToday.css";
import ReactAnimatedWeather from 'react-animated-weather';

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
const textFeel = (props) => {

    if (props === "ru") { return "Ощущается как:" }
    else if (props === "en") { return "Feeling like:" }
}
const textWet = (props) => {
    if (props === "ru") { return "Влажность:" }
    else if (props === "en") { return "Humidity:" }
}
const textWind = (props) => {
    if (props === "ru") { return "Скорость ветра:" }
    else if (props === "en") { return "Wind speed:" }
}


export const TemperatureToday = (props) => {
    const language = props.lang;

    const weatherNow = Math.round(props.tempNow.main.temp);
    const feelsLike = Math.round(props.tempNow.main.feels_like);

    return (


        < div className="todayTemp" >
            <div className="Temp">{hotOrCold(weatherNow)}°</div>
            <div className="WeatherImage"><ReactAnimatedWeather icon={getNameOfIcon(props.tempNow.weather[0].main)}
                color={'LemonChiffon'}
                size={94}
                animate={true} /></div>
            <div className="WeatherProps">
                <h3>{(props.tempNow.weather[0].description).toUpperCase()}</h3>
                <h3>{textFeel(language)} {hotOrCold(feelsLike)}°</h3>
                <h3>{textWet(language)} {props.tempNow.main.humidity}% </h3>
                <h3>{textWind(language)} {Math.round(props.tempNow.wind.speed)} М/С</h3>

            </div>
        </ div>

    );

};




