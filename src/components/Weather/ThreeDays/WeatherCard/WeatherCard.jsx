import React, { useState, useEffect } from 'react';
import data from '../../../../assets/data';
import './WeatherCard.css';

const WeatherCard = props => {
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
          setImg('bcn');
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
          setImg('bcd');
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

  return (
    <div className='weather-card'>
      <div className='date'>
        <span>
          {data.days[props.lang][new Date().getDay() + props.next]} &nbsp;
          {data.months[props.lang][new Date().getMonth()]} &nbsp;
          {new Date().getDate() + props.next} &nbsp;
          {new Date().getFullYear()}
        </span>
      </div>

      <div className='weather-info'>
        <div className='weather-description'>
          <span>
            {props.info.weather}
          </span>
        </div>
        <div className={`weather-three-icon ${img}`}></div>
      </div>

      <div className='temperature'>
        <span>
          {props.scale === 'far' ? (
            `${(props.info.avgTemp * 1.8 + 32).toFixed().toString()} °F`
          ) : (
            `${(props.info.avgTemp).toFixed().toString()} °C`
          )}
        </span>
      </div>
    </div>
  );
};

export default WeatherCard;
