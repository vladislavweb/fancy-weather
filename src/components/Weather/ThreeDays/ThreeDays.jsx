import React from 'react';
import './ThreeDays.css';
import WeatherCard from './WeatherCard/WeatherCard';

const ThreeDays = props => {
  return (
    <div className='ThreeDays'>
      {
        props.weatherThree.map((info, index) => {
          return (
            <WeatherCard info={info} key={index} next={index + 1} />
          )
        })
      }
    </div>
  );
};

export default ThreeDays;
