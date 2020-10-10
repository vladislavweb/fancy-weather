import React, { useState, useContext } from 'react';
import { WeatherContext } from './index';
import { MainContext } from '../../MainContext';
import {
  fetchCoordinates,
  fetchCountry,
  fetchCity,
  fetchWeather,
  fetchPicture,
  fetchCityByDefaultPosition
} from '../../api';

const WeatherApi = ({ children }) => {
  const [isRequestMap, setIsRequestMap] = useState(false);
  const [updateMap, setUpdateMap] = useState(false);
  const body = document.getElementsByTagName('body')[0];
  const { searchString, changeRequest } = useContext(MainContext);
  const { city, changeCity } = useContext(MainContext);
  const [currentLang, setCurrentLang] = useState(localStorage.getItem('language') || 'en');
  const [currentScale, setCurrentScale] = useState(localStorage.getItem('scale') || 'cel');
  const [country, setCountry] = useState('');
  const [imgNow, setImgNow] = useState('');
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);
  const [weatherNow, setWeatherNow] = useState({});


  const changeShowVirtualKeyboard = () => setShowVirtualKeyboard(!showVirtualKeyboard);

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

  const [weatherThree, setWeatherThree] = useState({
    ru: [],
    en: [],
    ua: [],
  });

  const changeBackground = (link) => {
    let image = new Image()
    image.src = link;
    image.onload = () => {
      body.setAttribute('style', `background-image: url(${link})`);
    };
  };

  const changeWeatherNow = (res) => {
    setWeatherNow({
      weather: {
        ru: res.ru.list[0].weather[0].description,
        en: res.en.list[0].weather[0].description,
        ua: res.ua.list[0].weather[0].description,
      },
      speed: res.en.list[0].wind.speed,
      humidity: res.en.list[0].main.humidity,
      feel: res.en.list[0].main.feels_like,
      temp: res.en.list[0].main.temp,
      img: res.en.list[0].weather[0].icon,
    });
  };

  const changeWeatherThreeDays = (res) => {
    const fetchWeatherThreeDays = {
      ru: [
        {
          avgTemp: (res.ru.list[8].main.temp_max + res.ru.list[8].main.temp_min) / 2,
          day: res.ru.list[8].weather[0].icon.charAt(2),
          img: res.ru.list[8].weather[0].icon.substring(0, 2),
          weather: res.ru.list[8].weather[0].description,
        },
        {
          avgTemp: (res.ru.list[16].main.temp_max + res.ru.list[16].main.temp_min) / 2,
          day: res.ru.list[16].weather[0].icon.charAt(2),
          img: res.ru.list[16].weather[0].icon.substring(0, 2),
          weather: res.ru.list[16].weather[0].description,
        },
        {
          avgTemp: (res.ru.list[24].main.temp_max + res.ru.list[24].main.temp_min) / 2,
          day: res.ru.list[24].weather[0].icon.charAt(2),
          img: res.ru.list[24].weather[0].icon.substring(0, 2),
          weather: res.ru.list[24].weather[0].description,
        },
      ],
      en: [
        {
          avgTemp: (res.en.list[8].main.temp_max + res.en.list[8].main.temp_min) / 2,
          day: res.en.list[8].weather[0].icon.charAt(2),
          img: res.en.list[8].weather[0].icon.substring(0, 2),
          weather: res.en.list[8].weather[0].description,
        },
        {
          avgTemp: (res.en.list[16].main.temp_max + res.en.list[16].main.temp_min) / 2,
          day: res.en.list[16].weather[0].icon.charAt(2),
          img: res.en.list[16].weather[0].icon.substring(0, 2),
          weather: res.en.list[16].weather[0].description,
        },
        {
          avgTemp: (res.en.list[24].main.temp_max + res.en.list[24].main.temp_min) / 2,
          day: res.en.list[24].weather[0].icon.charAt(2),
          img: res.en.list[24].weather[0].icon.substring(0, 2),
          weather: res.en.list[24].weather[0].description,
        },
      ],
      ua: [
        {
          avgTemp: (res.ua.list[8].main.temp_max + res.ua.list[8].main.temp_min) / 2,
          day: res.ua.list[8].weather[0].icon.charAt(2),
          img: res.ua.list[8].weather[0].icon.substring(0, 2),
          weather: res.ua.list[8].weather[0].description,
        },
        {
          avgTemp: (res.ua.list[16].main.temp_max + res.ua.list[16].main.temp_min) / 2,
          day: res.ua.list[16].weather[0].icon.charAt(2),
          img: res.ua.list[16].weather[0].icon.substring(0, 2),
          weather: res.ua.list[16].weather[0].description,
        },
        {
          avgTemp: (res.ua.list[24].main.temp_max + res.ua.list[24].main.temp_min) / 2,
          day: res.ua.list[24].weather[0].icon.charAt(2),
          img: res.ua.list[24].weather[0].icon.substring(0, 2),
          weather: res.ua.list[24].weather[0].description,
        },
      ],
    };

    setWeatherThree(fetchWeatherThreeDays);
  };

  const setSpeakWeather = (res) => {
    sessionStorage.setItem('weather-en', `Weather today: ${res.en.list[0].weather[0].description}, wind speed ${res.en.list[0].wind.speed.toFixed(1)} meter per second, humidity ${res.en.list[0].main.humidity} percent, the temperature feels like ${res.en.list[0].main.feels_like.toFixed()} degrees.`);

    sessionStorage.setItem('weather-ru', `Погода сегодня: ${res.ru.list[0].weather[0].description}, скорость ветра ${res.ru.list[0].wind.speed.toFixed(1)} метров в секунду, влажность ${res.ru.list[0].main.humidity} процентов, температура ощущается как ${res.ru.list[0].main.feels_like.toFixed()} градусов.`);

    sessionStorage.setItem('weather-ua', `Погода сьогодні: ${res.ua.list[0].weather[0].description}, швидкість вітру ${res.ua.list[0].wind.speed.toFixed(1)} метрів в секунду, вологість ${res.ua.list[0].main.humidity} відсоток, температура відчувається як ${res.ua.list[0].main.feels_like.toFixed()} градус.`);
  };

  const getData = async (useDefaultPosition = false, position) => {
    if (useDefaultPosition) {
      setIsRequestMap(false);
    } else {
      setIsRequestMap(true);
    }

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

        const weathers = await fetchWeather(lat, long);

        let weatherForNowToday = weathers.en.list[0].weather[0].icon.substring(0, 2);
        nowToday(weathers.en.list[0].sys.pod, weatherForNowToday);

        let picture;
        switch (weathers.en.list[0].sys.pod) {
          case 'n':
            picture = await fetchPicture('night', weathers.en.list[0].weather[0].main);
            sessionStorage.setItem('photo', `night ${weathers.en.list[0].weather[0].main}`)
            break;
          case 'd':
            picture = await fetchPicture('day', weathers.en.list[0].weather[0].main);
            sessionStorage.setItem('photo', `day ${weathers.en.list[0].weather[0].main}`)
            break;
          default:
            throw Error('Ожидается n или d');
        };

        if (picture) {
          changeBackground(picture.urls.regular);
        }

        setSpeakWeather(weathers);

        changeWeatherNow(weathers);

        changeWeatherThreeDays(weathers);

        if (!useDefaultPosition) {
          setUpdateMap(true);
        }
      } else {
        changeRequest(true);
      }
    }
  };

  const changeUpdateMap = value => setUpdateMap(value);
  const changeIsRequestMap = value => setIsRequestMap(value);
  const changeCurrentLang = value => setCurrentLang(value);
  const changeCurrentScale = value => setCurrentScale(value);

  return (
    <WeatherContext.Provider value={{city, country, imgNow, ...weatherNow, weatherThree, getData, updateMap, changeUpdateMap, changeIsRequestMap, isRequestMap, currentLang, changeCurrentLang, changeCurrentScale, currentScale, showVirtualKeyboard, changeShowVirtualKeyboard}}>
      {children}
    </WeatherContext.Provider>
  )
}

export default WeatherApi;
