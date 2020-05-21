import React from 'react';
import classes from './ThreeDays.module.css';
import WeatherCard from './WeatherCard/WeatherCard';

const ThreeDays = props => {
  return (
    <div className={classes.ThreeDays}>
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
