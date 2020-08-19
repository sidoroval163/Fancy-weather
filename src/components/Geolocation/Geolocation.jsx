import React from 'react';

import { Longitude } from './components/Longitude/Longitude';
import { Attitude } from './components/Attitude/Attitude';
import { YMaps, Map } from 'react-yandex-maps';
import "./Geolocation.css";




export class Geolocation extends React.Component {


    render() {

        const { lat: cityLatitude, lng: cityLongitude } = this.props.city.results[0].geometry;
        return <div className="geolocation">
            <YMaps>
                <div className="map" >
                    <Map defaultState={{ center: [cityLatitude, cityLongitude], zoom: 8 }}
                        state={{ center: [cityLatitude, cityLongitude], zoom: 8 }} className="mapMini" />
                </div>
            </YMaps>
            <Longitude lat={cityLatitude} lang={this.props.lang} />
            <Attitude lng={cityLongitude} lang={this.props.lang} />

        </div >;
    }
}






