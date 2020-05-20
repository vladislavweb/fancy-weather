import React, { useState, useEffect } from 'react';
import classes from './Today.module.css';

const Today = props => {
  const [date] = useState(new Date().toDateString());
  const [time, setTime] = useState({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
  })

  useEffect(() => {
    setTimeout(() => {
      setTime(
        {
          hours: new Date().getHours(),
          minutes: new Date().getMinutes(),
          seconds: new Date().getSeconds(),
        },
      )
    }, 1000);
  });

  return (
    <div className={classes.Today}>
      <div className={classes.Location}>
        <p>
          {props.country}
        </p>
        <p>
          {props.city}
        </p>
      </div>
      <div className={classes.Date}>
        {date}
      </div>
      <div className={classes.Time}>
        {time.hours}:{time.minutes}:{time.seconds} 
      </div>
      <div className={classes.About}>
        <div className={classes.AboutWeather}>
          {props.weather}
        </div>
        <div className={classes.AboutIcon}>

        </div>
      </div>
      <div className={classes.Parameters}>
        <div className={classes.Temperature}>
          <div className='cel'>
            <span>
              {(props.temp / 1).toFixed()}
            </span>
            <span>
              °C
            </span>
          </div>
          <div className='far hidden'>
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
            <span className='cel'>
              {(props.feel / 1).toFixed()}
            </span>

            <span className='far hidden'>
              {(props.fell * 1.8 + 32).toFixed().toString()}
            </span>
          </div>
          <div className={classes.speed}>
            {props.speed}
          </div>
          <div className={classes.humidity}>
            {props.humidity}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;
