import React, { useState, useEffect, useContext } from 'react';
import './Today.css';
import changeShowLang from '../../../scripts/changeShowLang';
import changeShowScale from '../../../scripts/changeShowScale';
import data from '../../../assets/data';
import { WeatherContext } from '../../../Context/WeatherContext';

const Today = props => {
  const { city, country, weather, speed, feel, humidity, temp, imgNow, isRequestMap, changeIsRequestMap } = useContext(WeatherContext)
  const [enCity, setEnCity] = useState('');
  const [ruCity, setRuCity] = useState('');
  const [beCity, setBeCity] = useState('');
  const [ruWeather, setRuWeather] = useState('');
  const [beWeather, setBeWeather] = useState('');
  const [ruCountry, setRuCountry] = useState('');
  const [beCountry, setBeCountry] = useState('');
  const [time, setTime] = useState({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
  });

  useEffect(
    () => {
      if (isRequestMap) {
        console.log(city, isRequestMap);
        
        setEnCity(city);

        fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${city}&lang=en-be`)
          .then((res) => res.json())
          .then((data) => {
            setBeCity(data.text[0]);
          });

        fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${city}&lang=en-ru`)
          .then((res) => res.json())
          .then((data) => {
            setRuCity(data.text[0]);
          });

          changeIsRequestMap(false)
          console.log(isRequestMap);
      } else {
        console.log(city);
        
        setRuCity(city);

        fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${city}&lang=ru-en`)
          .then((res) => res.json())
          .then((data) => {
            setEnCity(data.text[0]);
          });

        fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${city}&lang=ru-be`)
          .then((res) => res.json())
          .then((data) => {
            setBeCity(data.text[0]);
          });
      }
    }, [city]
  );

  useEffect(
    () => {
      fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${country}&lang=en-ru`)
        .then((res) => res.json())
        .then((data) => {
          setRuCountry(data.text[0]);
        });

      fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${country}&lang=en-be`)
        .then((res) => res.json())
        .then((data) => {
          setBeCountry(data.text[0]);
        });
    },
    [country]
  );

  useEffect(
    () => {
      fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${weather}&lang=en-ru`)
        .then((res) => res.json())
        .then((data) => {
          setRuWeather(data.text[0]);
        });

      fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${weather}&lang=en-be`)
        .then((res) => res.json())
        .then((data) => {
          setBeWeather(data.text[0]);
        });
    },
    [weather]
  );

  useEffect(
    () => {
      changeShowScale(localStorage.getItem('scale'));
      changeShowLang(localStorage.getItem('language'));
    },
    []
  );

  useEffect(
    () => {
      const timeout = setTimeout(() => {
        setTime(
          {
            hours: new Date().getHours(),
            minutes: new Date().getMinutes(),
            seconds: new Date().getSeconds(),
          },
        );

        return () => clearTimeout(timeout)
      }, 1000);
    },
    [time]
  );

  return (
    <div className='today'>
      <div className='location'>
        <span className='ru'>
          <p className='city'>
            {ruCity}
          </p>
          <p className='country'>
            {ruCountry}
          </p>
        </span>
        <span className='en'>
          <p className='city'>
            {enCity}
          </p>
          <p className='country'>
            {country}
          </p>
        </span>
        <span className='be'>
          <p className='city'>
            {beCity}
          </p>
          <p className='country'>
            {beCountry}
          </p>
        </span>
      </div>

      <div className='date'>
        <span className='ru'>
          {data.days.ru[new Date().getDay()]} &nbsp;
          {data.months.ru[new Date().getMonth()]} &nbsp;
          {new Date().getDate()} &nbsp;
          {new Date().getFullYear()}
        </span>
        <span className='en'>
          {data.days.en[new Date().getDay()]} &nbsp;
          {data.months.en[new Date().getMonth()]} &nbsp;
          {new Date().getDate()} &nbsp;
          {new Date().getFullYear()}
        </span>
        <span className='be'>
          {data.days.be[new Date().getDay()]} &nbsp;
          {data.months.be[new Date().getMonth()]} &nbsp;
          {new Date().getDate()} &nbsp;
          {new Date().getFullYear()}
        </span>
      </div>

      <div className='time'>
        <div className="old">
          {time.hours}:{time.minutes}:{time.seconds}
        </div>
      </div>

      <div className='about'>
        <div className='about-weather'>
          <span className='ru'>
            {ruWeather}
          </span>
          <span className='en'>
            {weather?.toUpperCase()}
          </span>
          <span className='be'>
            {beWeather}
          </span>
        </div>
        <div className={`aboutIcon ${imgNow}`}>
        </div>
      </div>

      <div className='parameters'>
        <div className='temperature'>
          <div className='cel'>
            <span>
              {(temp / 1).toFixed()}
            </span>
            <span>
              °C
            </span>
          </div>
          <div className='far'>
            <span>
              {(temp * 1.8 + 32).toFixed().toString()}
            </span>
            <span>
              °F
            </span>
          </div>
        </div>

        <div className='details'>
          <div className='speed'>
            <span className='ru'>
              Скорость ветра: {speed}м/с
            </span>
            <span className='en'>
              Wind speed: {speed}mph
            </span>
            <span className='be'>
              Хуткасць ветру: {speed}м/с
            </span>
          </div>

          <div className='feel'>
            <span className='ru'>
              <span className='cel'>
                Ощущается как: {(feel / 1).toFixed()} °C
              </span>
              <span className='far'>
                Ощущается как: {(feel / 1 * 1.8 + 32).toFixed()} °F
              </span>
            </span>
            <span className='en'>
              <span className='cel'>
                Feels like: {(feel / 1).toFixed()} °C
              </span>
              <span className='far'>
                Feels like: {(feel / 1 * 1.8 + 32).toFixed()} °F
              </span>
            </span>
            <span className='be'>
              <span className='cel'>
                Адчуваецца як: {(feel / 1).toFixed()} °C
              </span>
              <span className='far'>
                Адчуваецца як: {(feel / 1 * 1.8 + 32).toFixed()} °F
              </span>
            </span>
          </div>

          <div className='humidity'>
            <span className='ru'>
              Влажность: {humidity}%
            </span>
            <span className='en'>
              Humidity: {humidity}%
            </span>
            <span className='be'>
              Вільготнасць: {humidity}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;
