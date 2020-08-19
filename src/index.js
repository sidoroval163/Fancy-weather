import React from 'react';
import ReactDOM from 'react-dom';
import LoadingScreen from 'react-loading-screen'
import "./Wrapper.css";
import { WeatherToday } from './components/WeatherToday/WeatherToday';
import { ThreeDayWthr } from './components/ThreeDayWthr/ThreeDayWthr';
import { Geolocation } from './components/Geolocation/Geolocation';
import Myimage from './images/refresh_icon.svg'
import best from './images/best_loader.gif'

const DEFAULT_PICTURE_URL = "https://i.gifer.com/OvZ.gif";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      weather: null,
      forecast: null,
      threeDaysWthr: null,
      myPosition: null,
      city: null,
      lang: "en",
      unitsType: "metric",
      picture: null,
      cityName: null,
      loading: true,
    };
  };

  switchBackgroundHandler = () => {


    this.launchRequest("picture").then((result) => this.setState({ picture: result }, () => {
      const background = document.getElementById("wrapper");
      background.style.cssText = `background-image: url(${this.state.picture ? this.state.picture.urls.regular : DEFAULT_PICTURE_URL});`;
    }));


  }

  languageSelectorHandler = (e) => {



    this.setState({ lang: e.target.value }, () => this.getRequest(this.state.cityName));

  }


  farenheitToC(temp) {
    return (temp - 32) * (5 / 9);
  }
  CTofarenheit(temp) {
    return (temp) * (9 / 5) + 32;
  }


  translateTemperature(unitsType) {



    const forecast = this.state.forecast;
    const weather = this.state.weather;

    let temperatureNow = weather.main.temp;
    let temperatureFeelsLike = weather.main.feels_like;
    if (unitsType === "metric") {
      weather.main.temp = this.farenheitToC(temperatureNow);
      weather.main.feels_like = this.farenheitToC(temperatureFeelsLike);
      forecast.list[8].main.temp = this.farenheitToC(forecast.list[8].main.temp);
      forecast.list[16].main.temp = this.farenheitToC(forecast.list[16].main.temp);
      forecast.list[24].main.temp = this.farenheitToC(forecast.list[24].main.temp);
    } else {
      weather.main.temp = this.CTofarenheit(temperatureNow);
      weather.main.feels_like = this.CTofarenheit(temperatureFeelsLike);
      forecast.list[8].main.temp = this.CTofarenheit(forecast.list[8].main.temp);
      forecast.list[16].main.temp = this.CTofarenheit(forecast.list[16].main.temp);
      forecast.list[24].main.temp = this.CTofarenheit(forecast.list[24].main.temp);
    }

    this.setState({ weather });
    this.setState({ forecast });
  }


  farenheitButtonHandler = () => {

    if (this.state.weather && this.state.forecast) {
      this.setState({ unitsType: "imperial" }, () => this.translateTemperature('imperial'))
    }



  }

  celsiumButtonHandler = () => {
    if (this.state.weather && this.state.forecast) {
      this.setState({ unitsType: "metric" }, () => this.translateTemperature('metric'))
    }

  }

  searhBtnHandler = (city) => {

    this.getRequest(city)
  }
  handleOnchange = (e) => {
    this.setState({ cityName: e.target.value })

  }

  handleChange = (e) => {
    if (e.key == 'Enter') {
      this.searhBtnHandler(this.state.cityName);
    }
  }

  render() {


    return (


      <LoadingScreen
        loading={this.state.loading}
        bgColor='#f1f1f1'
        spinnerColor='#9ee5f8'
        textColor='#676767'
        logoSrc={best}
        text='Пожалуйста подождите'
      >




        <div className="wrapper" id="wrapper"  >

          <div className="controlBlock">
            <div className="wrapperButtons">
              <div className="switchBackgroundButton" id="refresh" onClick={() => this.switchBackgroundHandler()}>
                <img className="refresh" id="refresher" src={Myimage} /></div>
              <div className="dropdown">
                <select className="droplist_base" id="languageSelector" onChange={this.languageSelectorHandler} >
                  <option value="en">En</option>
                  <option value="ru">Ru</option>

                </select>
              </div>
              <div className="wrapper-radio_btns">
                <button disabled={this.state.unitsType === "imperial"} className={`button_farenheit ${this.state.unitsType === "imperial" ? 'focused_temp' : ""}`} id="farenheitButton"
                  onClick={() => this.farenheitButtonHandler()}></button>
                <button disabled={this.state.unitsType === "metric"} className={`button_celsium ${this.state.unitsType === "metric" ? 'focused_temp' : ""}`} id="celsiumButton" onClick={() => this.celsiumButtonHandler()}></button>
              </div>
            </div>
            <div className="wrapper_search">
              <input className="input_base" id="searchCity" type="search" placeholder="Search city" onChange={this.handleOnchange} onKeyPress={this.handleChange}></input>

              <div className="btn-search" id="searchBtn" onClick={() => this.searhBtnHandler(this.state.cityName)} > SEARCH </div>

            </div >
          </div>
          <div className="weatherWrapper">
            {this.state.weather && <WeatherToday temper={this.state.weather} lang={this.state.lang} />}
            {this.state.forecast && <ThreeDayWthr threeDayWeather={this.state.threeDaysWthr} lang={this.state.lang} />}

          </div>

          {this.state.city && <Geolocation city={this.state.city} lang={this.state.lang} />}




        </div >
      </LoadingScreen >
    )
  }

  async getRequest(city) {

    const newState = {};
    newState.weather = await this.launchRequest("weather", city, null);
    if (newState.weather) {
      const Forecaster = await this.launchRequest("forecast", city, null);

      const ArrthreeDaysWthr = Forecaster.list.filter((elem, index) => index === 8 || index === 16 || index === 24);
      newState.forecast = Forecaster;
      newState.threeDaysWthr = ArrthreeDaysWthr;
      newState.city = await this.launchRequest("coord", city, null);
      newState.cityName = city;
      newState.picture = await this.launchRequest("picture", city, null);
      newState.loading = false;
      this.setState(newState);

    }
  }

  async launchRequest(typeOfRequest, city, coord) {
    const link = this.getLink(typeOfRequest, city, coord);
    const request = await fetch(link);

    if (request.status === 403) { return false }

    const parsedRequest = await request.json();

    if (parsedRequest.message === "city not found") { return false, alert('введите другой город') }
    else { return parsedRequest; }

  }











  getLink(typeOfRequest, city, coord) {
    let link;
    switch (typeOfRequest) {
      case "weather":
        link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${this.state.lang}&units=${this.state.unitsType}&appid=28c72f6418a6f4fdf083d18908206742`;
        break;
      case "forecast":
        link = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${this.state.lang}&units=${this.state.unitsType}&APPID=28c72f6418a6f4fdf083d18908206742`;
        break;
      case "coord":
        link = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=6eefb8f093e64e4b865c3281df69b384`;
        break;
      case "city":
        link = `https://api.opencagedata.com/geocode/v1/json?q=${coord.latitude}+${coord.longitude}&language=de&key=6eefb8f093e64e4b865c3281df69b384`;
        break;
      case "picture":
        link = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=175FYCnNB3FK0X4DTIHQ3Yf05v5ewj0pg_I5UKSm5x4`;
        break;
      default:
        break;
    }
    return link;
  }
  componentDidMount() {
    const background = document.getElementById("wrapper");

    this.launchRequest("picture").then((result) => {

      this.setState({ picture: result }, () => {

        background.style.cssText = `background-image: url(${this.state.picture ? this.state.picture.urls.regular : DEFAULT_PICTURE_URL});`;
      })
    })
  }

  componentWillMount() {

    window.navigator.geolocation.getCurrentPosition((myPosition) => {

      this.launchRequest("city", null, myPosition.coords)
        .then((result) => this.getRequest(result.results[0].components.city));
    }, () => this.setState({ loading: false }))

  }
}

ReactDOM.render(<App />, document.getElementById("root"));





