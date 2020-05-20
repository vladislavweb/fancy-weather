import React from 'react';
import classes from './WeatherCard.module.css';

const WeatherCard = props => {
  return (
    <div className={classes.WeatherCard}>
      <p className={classes.day}>

      </p>
      <p className={classes.temperature}>

      </p>
      <img src="" alt="weather"/>
    </div>
  );
};

export default WeatherCard;
