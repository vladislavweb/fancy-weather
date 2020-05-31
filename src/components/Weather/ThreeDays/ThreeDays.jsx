import React, { useContext } from 'react';
import './ThreeDays.css';
import WeatherCard from './WeatherCard/WeatherCard';
import { WeatherContext } from '../../../Context/WeatherContext';

const ThreeDays = props => {
  const { weatherThree } = useContext(WeatherContext);

  return (
    <div className='ThreeDays'>
      {
        weatherThree.map((info, index) => {
          return (
            <WeatherCard info={info} key={index} next={index + 1} />
          )
        })
      }
    </div>
  );
};

export default ThreeDays;
