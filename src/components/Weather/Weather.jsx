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
const tokenGeo = 'BtHcuGO81EUArGaV164zvKD5sTuERK2O'
const urlGeo = 'https://www.mapquestapi.com/geocoding/v1/address?key='

const Weather = props => {
  const { searchString, changeSearchString } = useContext(MainContext);

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
            setWeatherNow({
              lang: localStorage.getItem('language'),
              city: res.city.name,
              weather: res.list[0].weather[0].description,
              speed: res.list[0].wind.speed,
              humidity: res.list[0].main.humidity,
              feel: res.list[0].main.feels_like,
              temp: res.list[0].main.temp,
              img: res.list[0].weather[0].icon,
            });

            setIsDataLoaded(true);

            setWeatherThree([
              {
                avgTemp: (res.list[8].main.temp_max + res.list[8].main.temp_min) / 2,
                img: '',
                weather: res.list[8].weather[0].description,
              },
              {
                avgTemp: (res.list[16].main.temp_max + res.list[16].main.temp_min) / 2,
                img: '',
                weather: res.list[16].weather[0].description,
              },
              {
                avgTemp: (res.list[24].main.temp_max + res.list[24].main.temp_min) / 2,
                img: '',
                weather: res.list[24].weather[0].description,
              },
            ])
          });
      });
      isFound = false;
    }
  })

  useEffect(() => {
    if (searchString) {
      if (searchString.length > 3) {
        fetch(`${urlGeo}${tokenGeo}&location=${searchString}`)
          .then(data => data.json())
          .then((data) => {
            lat = data.results[0].locations[0].latLng.lat;
            long = data.results[0].locations[0].latLng.lng;

            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?types=country&access_token=${tokenMap}`)
              .then(res => res.json())
              .then(res => {
                setCountry(res.features[0].place_name);
              })

            fetch(`${link}lat=${lat}&lon=${long}&appid=${keyWeather}&lang=en&cnt=32&units=metric`)
              .then(res => res.json())
              .then(res => {
                console.log(res);
                
                setWeatherNow({
                  lang: localStorage.getItem('language'),
                  city: res.city.name,
                  weather: res.list[0].weather[0].description,
                  speed: res.list[0].wind.speed,
                  humidity: res.list[0].main.humidity,
                  feel: res.list[0].main.feels_like,
                  temp: res.list[0].main.temp,
                  img: res.list[0].weather[0].icon,
                });

                setWeatherThree([
                  {
                    avgTemp: (res.list[8].main.temp_max + res.list[8].main.temp_min) / 2,
                    img: '',
                    weather: res.list[8].weather[0].description,
                  },
                  {
                    avgTemp: (res.list[16].main.temp_max + res.list[16].main.temp_min) / 2,
                    img: '',
                    weather: res.list[16].weather[0].description,
                  },
                  {
                    avgTemp: (res.list[24].main.temp_max + res.list[24].main.temp_min) / 2,
                    img: '',
                    weather: res.list[24].weather[0].description,
                  },
                ])
              })

            changeSearchString('');
          })
      };
    };
  });

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
