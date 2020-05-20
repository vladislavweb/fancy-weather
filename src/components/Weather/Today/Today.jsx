import React, { useState, useEffect } from 'react';
import classes from './Today.module.css';
import changeShowLang from '../../../scripts/changeShowLang';
import changeShowScale from '../../../scripts/changeShowScale';

const Today = props => {
  const [ruCity, setRuCity] = useState('');
  const [ruWeather, setRuWeather] = useState('');
  const [beCity, setBeCity] = useState('');
  const [beWeather, setBeWeather] = useState('');
  const [date] = useState(new Date().toDateString());
  const [time, setTime] = useState({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
  });

  useEffect(
    () => {
      fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${props.city}&lang=en-ru`)
        .then((res) => res.json())
        .then((data) => {
          setRuCity(data.text[0]);
        });

      fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${props.weather}&lang=en-ru`)
        .then((res) => res.json())
        .then((data) => {
          setRuWeather(data.text[0]);
        });

      fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${props.city}&lang=en-be`)
        .then((res) => res.json())
        .then((data) => {
          setBeCity(data.text[0]);
        });

      fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${props.weather}&lang=en-be`)
        .then((res) => res.json())
        .then((data) => {
          setBeWeather(data.text[0]);
        });
    },
    [props.city, props.weather]
  );

  useEffect(() => {
    changeShowScale(localStorage.getItem('scale'));
    changeShowLang(localStorage.getItem('language'));
  });

  setTimeout(() => {
    setTime(
      {
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds(),
      },
    );
  }, 1000);

  return (
    <div className={classes.today}>
      <div className={classes.location}>
        <span className='ru'>
          <p className={classes.city}>
            {ruCity}
          </p>
          <p className={classes.country}>
            {props.country}
          </p>
        </span>
        <span className='en'>
          <p className={classes.city}>
            {props.city}
          </p>
          <p className={classes.country}>
            {props.country}
          </p>
        </span>
        <span className='be'>
          <p className={classes.city}>
            {beCity}
          </p>
          <p className={classes.country}>
            {props.country}
          </p>
        </span>
      </div>

      <div className={classes.date}>
        {date}
      </div>

      <div className={classes.time}>
        {time.hours}:{time.minutes}:{time.seconds} 
      </div>

      <div className={classes.about}>
        <div className={classes.aboutWeather}>
          <span className='ru'>
            {ruWeather}
          </span>
          <span className='en'>
            {props.weather}
          </span>
          <span className='be'>
            {beWeather}
          </span>
        </div>
        <div className={classes.aboutIcon}>
        </div>
      </div>

      <div className={classes.parameters}>
        <div className={classes.temperature}>
          <div className='cel'>
            <span>
              {(props.temp / 1).toFixed()}
            </span>
            <span>
              °C
            </span>
          </div>
          <div className='far'>
            <span>
              {(props.temp * 1.8 + 32).toFixed().toString()}
            </span>
            <span>
              °F
            </span>
          </div>
        </div>

        <div className={classes.details}>
          <div className={classes.feel}>
            <span className='ru'>
              <span className='cel'>
                Ощущается как: {(props.feel / 1).toFixed()} °C
              </span>
              <span className='far'>
                Ощущается как: {(props.feel / 1 * 1.8 + 32).toFixed()} °F
              </span>
            </span>
            <span className='en'>
              <span className='cel'>
                Feels like: {(props.feel / 1).toFixed()} °C
              </span>
              <span className='far'>
                Feels like: {(props.feel / 1 * 1.8 + 32).toFixed()} °F
              </span>
            </span>
            <span className='be'>
              <span className='cel'>
                Адчуваецца як: {(props.feel / 1).toFixed()} °C
              </span>
              <span className='far'>
                Адчуваецца як: {(props.feel / 1 * 1.8 + 32).toFixed()} °F
              </span>
            </span>
          </div>

          <div className={classes.speed}>
            <span className='ru'>
              Скорость ветра: {props.speed}м/с
            </span>
            <span className='en'>
              Wind speed: {props.speed}mph
            </span>
            <span className='be'>
              Хуткасць ветру: {props.speed}м/с
            </span>
          </div>

          <div className={classes.humidity}>
            <span className='ru'>
              Влажность: {props.humidity}%
            </span>
            <span className='en'>
              Humidity: {props.humidity}%
            </span>
            <span className='be'>
              Вільготнасць: {props.humidity}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;
