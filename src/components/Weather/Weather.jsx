import React, { useState, useEffect, useContext } from 'react';
import classes from './Weather.module.css';
import WeatherCard from './WeatherCard/WeatherCard';
import { MainContext } from '../../MainContext';
import Today from './Today/Today';

let isFound = true;
let lat = 0;
let long = 0;
const link = 'https://api.openweathermap.org/data/2.5/forecast?';
const keyWeather = 'eac54b3672659f3dd10f71d884f30279';

const Weather = props => {
  const { searchString } = useContext(MainContext);

  const [weatherNow, setWeatherNow] = useState({
    lang: localStorage.getItem('language'),
    country: '-',
    city: '-',
    weather: '-',
    speed: 0,
    humidity: 0,
    feel: 0,
    temp: 0,
  });

  const [weatherThree, setWeatherThree] = useState({});

  useEffect(() => {
    let varik = [];
    if (isFound) {
      navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        fetch(`${link}lat=${lat}&lon=${long}&appid=${keyWeather}&lang=en&cnt=40&units=metric`)
          .then(res => res.json())
          .then(res => {
            let now = (Date.now() / 1000).toFixed();
            for (let i = 0; i < 8; i++) {
              if (res.list[i].dt > now) {
                varik.push(i)
              };
            };

            setWeatherNow({
              lang: localStorage.getItem('language'),
              country: res.city.country,
              city: res.city.name,
              weather: res.list[varik[0]].weather[0].description,
              speed: res.list[varik[0]].wind.speed,
              humidity: res.list[varik[0]].main.humidity,
              feel: res.list[varik[0]].main.feels_like,
              temp: res.list[varik[0]].main.temp,
            });
          });
      });
      isFound = false;
    }
  })

  return (
    <div className={classes.Weather}>
      <Today {...weatherNow} />
      <div className={classes.ThreeDay}>

      </div>
    </div>
  );
};

export default Weather;
