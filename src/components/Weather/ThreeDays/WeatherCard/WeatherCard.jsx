import React, { useState, useEffect } from 'react';
import './WeatherCard.css';
import data from '../../../../assets/data';

const WeatherCard = props => {
  const [ruWeather, setRuWeather] = useState('');
  const [beWeather, setBeWeather] = useState('');
  const [img, setImg] = useState('');

  const nowToday = (day, weath) => {
    if (day === 'n') {
      switch (weath) {
        case '01':
          setImg('csn');
          break;
        case '02':
          setImg('fcn');
          break;
        case '03':
          setImg('scn');
          break;
        case '04':
          setImg('bc');
          break;
        case '09':
          setImg('sr');
          break;
        case '10':
          setImg('rn');
          break;
        case '11':
          setImg('thunderstorm');
          break;
        case '13':
          setImg('sn');
          break;
        case '50':
          setImg('mist');
          break;
        default:
      }
    } else if (day === 'd') {
      switch (weath) {
        case '01':
          setImg('csd');
          break;
        case '02':
          setImg('fcd');
          break;
        case '03':
          setImg('scd');
          break;
        case '04':
          setImg('bc');
          break;
        case '09':
          setImg('sr');
          break;
        case '10':
          setImg('rd');
          break;
        case '11':
          setImg('thunderstorm');
          break;
        case '13':
          setImg('sd');
          break;
        case '50':
          setImg('mist');
          break;
        default:
      };
    };
  };

  useEffect(
    () => {
      nowToday(props.info.day, props.info.img)
    },
    [props.info.img]
  );

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
    <div className='weather-card'>
      <div className='date'>
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

      <div className='weather-info'>
        <div className='weather-description'>
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
        <div className={`weather-three-icon ${img}`}></div>
      </div>

      <div className='temperature'>
        <span className='cel'>
          {(props.info.avgTemp).toFixed().toString()} °C
        </span>
        <span className='far'>
          {(props.info.avgTemp * 1.8 + 32).toFixed().toString()} °F
        </span>
      </div>
    </div>
  );
};

export default WeatherCard;
