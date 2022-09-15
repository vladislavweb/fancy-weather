import React, { FC } from 'react';
import data from '../../../../assets/data';
import { Language, Scale, Weather } from '../../../../types/props';
import './weatherCard.css';

interface Props {
  weather: Weather;
  scale: Scale;
  lang: Language;
  next: number;
}

const WeatherCard: FC<Props> = ({ weather, scale, lang, next }) => {
  return (
    <div className='weather-card'>
      <div className='date'>
        <span>
          {data.days[lang][new Date().getDay() + next]} &nbsp;
          {data.months[lang][new Date().getMonth()]} &nbsp;
          {new Date().getDate() + next} &nbsp;
          {new Date().getFullYear()}
        </span>
      </div>

      <div className='weather-info'>
        <div className='weather-description'>
          <span>
            {weather.description}
          </span>
        </div>
        <div className={`weather-three-icon ${weather.img}`}></div>
      </div>

      <div className='temperature'>
        <span>
          {scale === 'far'
            ? `${(weather.avgTemp * 1.8 + 32).toFixed().toString()} °F`
            : `${(weather.avgTemp).toFixed().toString()} °C`
          }
        </span>
      </div>
    </div>
  );
};

export default WeatherCard;
