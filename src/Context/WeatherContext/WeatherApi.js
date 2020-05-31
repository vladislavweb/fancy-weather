import React, { useEffect, useState, useContext } from 'react';
import {WeatherContext} from './index';
import { MainContext } from '../../MainContext';
import { fetchCoordinates, fetchCountry, fetchCity, fetchWeather, fetchPicture, fetchCityByDefaultPosition } from '../../api';

const WeatherApi = ({ children }) => {
  const [isRequestMap, setIsRequestMap] = useState(false);
  const [updateMap, setUpdateMap] = useState(false);
  const body = document.getElementsByTagName('body')[0];
  const [speakEn, setSpeakEn] = useState('');
  const { searchString, changeRequest } = useContext(MainContext);
  const { city, changeCity } = useContext(MainContext);
  const [country, setCountry] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [imgNow, setImgNow] = useState('');
  const [weatherNow, setWeatherNow] = useState({
    lang: localStorage.getItem('language'),
    weather: '-',
    speed: 0,
    humidity: 0,
    feel: 0,
    temp: 0,
  });

  const nowToday = (day, weath) => {
    if (day === 'n') {
      switch (weath) {
        case '01':
          setImgNow('csn');
          break;
        case '02':
          setImgNow('fcn');
          break;
        case '03':
          setImgNow('scn');
          break;
        case '04':
          setImgNow('bcn');
          break;
        case '09':
          setImgNow('sr');
          break;
        case '10':
          setImgNow('rn');
          break;
        case '11':
          setImgNow('thunderstorm');
          break;
        case '13':
          setImgNow('sn');
          break;
        case '50':
          setImgNow('mist');
          break;
        default:
      }
    } else if (day === 'd') {
      switch (weath) {
        case '01':
          setImgNow('csd');
          break;
        case '02':
          setImgNow('fcd');
          break;
        case '03':
          setImgNow('scd');
          break;
        case '04':
          setImgNow('bcd');
          break;
        case '09':
          setImgNow('sr');
          break;
        case '10':
          setImgNow('rd');
          break;
        case '11':
          setImgNow('thunderstorm');
          break;
        case '13':
          setImgNow('sd');
          break;
        case '50':
          setImgNow('mist');
          break;
        default:
      }
    }
  }

  const [weatherThree, setWeatherThree] = useState([
    {
      avgTemp: 0,
      day: '',
      img: '',
      weather: '',
    },
    {
      avgTemp: 0,
      day: '',
      img: '',
      weather: '',
    },
    {
      avgTemp: 0,
      day: '',
      img: '',
      weather: '',
    },
  ]);

  const changeBackground = (link) => {
    let image = new Image()
    image.src = link;
    image.onload = () => {
      body.setAttribute('style', `background-image: url(${link})`);
    };
  };

  const changeWeatherNow = (res) => {
    setWeatherNow({
      lang: localStorage.getItem('language'),
      weather: res.list[0].weather[0].description,
      speed: res.list[0].wind.speed,
      humidity: res.list[0].main.humidity,
      feel: res.list[0].main.feels_like,
      temp: res.list[0].main.temp,
      img: res.list[0].weather[0].icon,
    });
  };

  const changeWeatherThreeDays = (res) => {
    setWeatherThree([
      {
        avgTemp: (res.list[8].main.temp_max + res.list[8].main.temp_min) / 2,
        day: res.list[8].weather[0].icon.charAt(2),
        img: res.list[8].weather[0].icon.substring(0, 2),
        weather: res.list[8].weather[0].description,
      },
      {
        avgTemp: (res.list[16].main.temp_max + res.list[16].main.temp_min) / 2,
        day: res.list[16].weather[0].icon.charAt(2),
        img: res.list[16].weather[0].icon.substring(0, 2),
        weather: res.list[16].weather[0].description,
      },
      {
        avgTemp: (res.list[24].main.temp_max + res.list[24].main.temp_min) / 2,
        day: res.list[24].weather[0].icon.charAt(2),
        img: res.list[24].weather[0].icon.substring(0, 2),
        weather: res.list[24].weather[0].description,
      },
    ]);
  };

  const setSpeakWeather = (res) => {
    setSpeakEn(`Weather today: ${res.list[0].weather[0].description}, wind speed ${res.list[0].wind.speed.toFixed(1)} meter per second, humidity ${res.list[0].main.humidity} percent, the temperature feels like ${res.list[0].main.feels_like.toFixed()} degrees.`)

    sessionStorage.setItem('weather-en', `Weather today: ${res.list[0].weather[0].description}, wind speed ${res.list[0].wind.speed.toFixed(1)} meter per second, humidity ${res.list[0].main.humidity} percent, the temperature feels like ${res.list[0].main.feels_like.toFixed()} degrees.`)
  };

  const getData = async (useDefaultPosition = false, position) => {
    setIsRequestMap(true);
    const coords = useDefaultPosition ? position : await fetchCoordinates(searchString);
    if (useDefaultPosition || coords.results[0].locations.length > 0) {
      if (useDefaultPosition || coords.results[0].locations[0].adminArea5.length > 0) {
        changeRequest(false);

        const lat = useDefaultPosition ? position.coords.latitude : coords.results[0].locations[0].latLng.lat;
        const long = useDefaultPosition ? position.coords.longitude : coords.results[0].locations[0].latLng.lng;

        const country = await fetchCountry(long, lat);
        setCountry(country.features[0].place_name);

        const city = useDefaultPosition ? await fetchCityByDefaultPosition(lat, long) : await fetchCity(searchString);

        changeCity(city.results[0].locations[0].adminArea5);

        const weather = await fetchWeather(lat, long);

        let weatherForNowToday = weather.list[0].weather[0].icon.substring(0, 2);
        nowToday(weather.list[0].sys.pod, weatherForNowToday);

        let picture;
        switch (weather.list[0].sys.pod) {
          case 'n':
            picture = await fetchPicture('night', weather.list[0].weather[0].main);
            break;
          case 'd':
            picture = await fetchPicture('day', weather.list[0].weather[0].main);
            break;
          default:
            throw Error('Ожидается n или d');
        };

        changeBackground(picture.urls.regular);

        setSpeakWeather(weather);

        changeWeatherNow(weather);

        changeWeatherThreeDays(weather);

        if (!useDefaultPosition) {
          setUpdateMap(true);
        }
      }
    }
  }

  useEffect(
    () => {
      fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${sessionStorage.getItem('weather-en')}&lang=en-ru`)
        .then((res) => res.json())
        .then((data) => {
          sessionStorage.setItem('weather-ru', data.text[0])
        });

      fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${sessionStorage.getItem('weather-en')}&lang=en-be`)
        .then((res) => res.json())
        .then((data) => {
          sessionStorage.setItem('weather-be', data.text[0])
        });
    },
    [speakEn]
  );

  const changeUpdateMap = value => {
    setUpdateMap(value);
  };

  const changeIsRequestMap = value => {
    setIsRequestMap(value);
  };

  return (
    <WeatherContext.Provider value={{city, country, imgNow, ...weatherNow, weatherThree, getData, updateMap, changeUpdateMap, changeIsRequestMap, isRequestMap}}>
      {children}
    </WeatherContext.Provider>
  )
}

export default WeatherApi;