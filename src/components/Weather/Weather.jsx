import React, { useState, useEffect, useContext } from 'react';
import classes from './Weather.module.css';
import ThreeDays from './ThreeDays/ThreeDays';
import { MainContext } from '../../MainContext';
import Today from './Today/Today';

let isFound = true;
let lat = 0;
let long = 0;
const link = 'https://api.openweathermap.org/data/2.5/forecast?';
const keyWeather = 'eac54b3672659f3dd10f71d884f30279';
const tokenMap = 'pk.eyJ1IjoiaGltaW1ldHN1IiwiYSI6ImNrYWNtZ3VheDBuc3gyc284djVrOW50MnUifQ.CKQQ3zFcMaaQWHB-vZ8KLQ';

const Weather = props => {
  const { searchString } = useContext(MainContext);
  const [country, setCountry] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [weatherNow, setWeatherNow] = useState({
    lang: localStorage.getItem('language'),
    city: '-',
    weather: '-',
    speed: 0,
    humidity: 0,
    feel: 0,
    temp: 0,
    img: '',
  });

  const [weatherThree, setWeatherThree] = useState([
    {
      avgTemp: 0,
      img: '',
      weather: '',
    },
    {
      avgTemp: 0,
      img: '',
      weather: '',
    },
    {
      avgTemp: 0,
      img: '',
      weather: '',
    },
  ]);

  useEffect(() => {
    let varik = [];
    if (isFound) {
      navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        long = position.coords.longitude;

        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?types=country&access_token=${tokenMap}`)
          .then(res => res.json())
          .then(res => {
            setCountry(res.features[0].place_name);
          })

        fetch(`${link}lat=${lat}&lon=${long}&appid=${keyWeather}&lang=en&cnt=32&units=metric`)
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
              city: res.city.name,
              weather: res.list[varik[0]].weather[0].description,
              speed: res.list[varik[0]].wind.speed,
              humidity: res.list[varik[0]].main.humidity,
              feel: res.list[varik[0]].main.feels_like,
              temp: res.list[varik[0]].main.temp,
              img: res.list[varik[0]].weather[0].icon,
            });

            setIsDataLoaded(true);

            setWeatherThree([
              {
                avgTemp: (res.list[15].main.temp_max + res.list[15].main.temp_min) / 2,
                img: '',
                weather: res.list[15].weather[0].description,
              },
              {
                avgTemp: (res.list[23].main.temp_max + res.list[23].main.temp_min) / 2,
                img: '',
                weather: res.list[23].weather[0].description,
              },
              {
                avgTemp: (res.list[31].main.temp_max + res.list[31].main.temp_min) / 2,
                img: '',
                weather: res.list[31].weather[0].description,
              },
            ])
          });
      });
      isFound = false;
    }
  })

  return (
    <div className={classes.Weather}>
      {
        isDataLoaded && <Today {...weatherNow} country={country} />
      }
      <ThreeDays weatherThree={weatherThree} />
    </div>
  );
};

export default Weather;
