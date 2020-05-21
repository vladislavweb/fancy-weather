import React, { useState, useEffect } from 'react';
import classes from './WeatherCard.module.css';
import data from '../../../../assets/data';

const WeatherCard = props => {
  const [ruWeather, setRuWeather] = useState('');
  const [beWeather, setBeWeather] = useState('');

  useEffect(
    () => {
      if (props.info.weather.length > 1) {
        fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${props.info.weather}&lang=en-ru`)
          .then((res) => res.json())
          .then((data) => {
            setRuWeather(data.text[0]);
          });

        fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${props.info.weather}&lang=en-be`)
          .then((res) => res.json())
          .then((data) => {
            setBeWeather(data.text[0]);
          });
      }
    },
    [props.info.weather]
  );

  return (
    <div className={classes.weatherCard}>
      <div className={classes.date}>
        <span className='ru'>
          {data.days.ru[new Date().getDay() + props.next]} &nbsp;
          {data.months.ru[new Date().getMonth()]} &nbsp;
          {new Date().getDate() + props.next} &nbsp;
          {new Date().getFullYear()}
        </span>
        <span className='en'>
          {data.days.en[new Date().getDay() + props.next]} &nbsp;
          {data.months.en[new Date().getMonth()]} &nbsp;
          {new Date().getDate() + props.next} &nbsp;
          {new Date().getFullYear()}
        </span>
        <span className='be'>
          {data.days.be[new Date().getDay() + props.next]} &nbsp;
          {data.months.be[new Date().getMonth()]} &nbsp;
          {new Date().getDate() + props.next} &nbsp;
          {new Date().getFullYear()}
        </span>
      </div>

      <div className={classes.weatherInfo}>
        <span className='ru'>
          {ruWeather}
        </span>
        <span className='en'>
          {props.info.weather}
        </span>
        <span className='be'>
          {beWeather}
        </span>
      </div>

      <div className={classes.temperature}>
        <span className='cel'>
          {(props.info.avgTemp).toFixed().toString()} °F
        </span>
        <span className='far'>
          {(props.info.avgTemp * 1.8 + 32).toFixed().toString()} °C
        </span>
      </div>
    </div>
  );
};

export default WeatherCard;
