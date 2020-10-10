import React, { useContext } from 'react';
import WeatherCard from './WeatherCard/WeatherCard';
import { WeatherContext } from '../../../Context/WeatherContext';
import './ThreeDays.css';

const ThreeDays = () => {
  const { weatherThree, currentLang, currentScale } = useContext(WeatherContext);

  return (
    <div className='ThreeDays'>
      {
        weatherThree[currentLang].map((info, index) => {
          return (
            <WeatherCard info={info} key={index} next={index + 1} lang={currentLang} scale={currentScale} />
          )
        })
      }
    </div>
  );
};

export default ThreeDays;
