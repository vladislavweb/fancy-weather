import React, { useState, useEffect } from 'react';
import data from '../../../assets/data';
import './today.css';

const speedDescription = {
  ru: 'Ощущается как: ',
  en: 'Feels like: ',
  ua: 'Відчувається як ',
};

const Today = ({ weatherData, location, settings }: any) => {
  const {
    description,
    speed,
    feel,
    humidity,
    temp,
    img,
  } = weatherData;

  const { city, country } = location;
  const { currentLang, currentScale } = settings;

  const [time, setTime] = useState({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
  });

  useEffect(
    () => {
      const timeout = setTimeout(() => {
        setTime(
          {
            hours: new Date().getHours(),
            minutes: new Date().getMinutes(),
            seconds: new Date().getSeconds(),
          },
        );

        return () => clearTimeout(timeout)
      }, 1000);
    },
    [time]
  );

  return (
    <div className='today'>
      <div className='location'>
        <p className='city'>
          {city}
        </p>
        <p className='country'>
          {country}
        </p>
      </div>

      <div className='date'>
        <span>
          {(data.days as any)[currentLang][new Date().getDay()]} &nbsp;
          {(data.months as any)[currentLang][new Date().getMonth()]} &nbsp;
          {new Date().getDate()} &nbsp;
          {new Date().getFullYear()}
        </span>
      </div>

      <div className='time'>
        <div className="old">
          {time.hours.toString().length === 1 ? `0${time.hours}` : `${time.hours}`}
          :
          {time.minutes.toString().length === 1 ? `0${time.minutes}` : `${time.minutes}`}
          :
          {time.seconds.toString().length === 1 ? `0${time.seconds}` : `${time.seconds}`}
        </div>
      </div>

      <div className='about'>
        <div className='about-weather'>
          <span>
            {description[currentLang]}
          </span>
        </div>
        <div className={`aboutIcon ${img}`}>
        </div>
      </div>

      <div className='parameters'>
        <div className='temperature'>
          {currentScale === 'far' ? (
            <div>
              <span>
                {(temp * 1.8 + 32).toFixed().toString()}
              </span>
              <span>
                °F
              </span>
            </div>
          ) : (
            <div>
              <span>
                {(temp / 1).toFixed()}
              </span>
              <span>
                °C
              </span>
            </div>
          )}
        </div>

        <div className='details'>
          <div className='speed'>
            {currentLang === 'ru' ? (
              <span>
                Скорость ветра: {speed}м/с
              </span>
            ) : currentLang === 'en' ? (
              <span>
                Wind speed: {speed}mph
              </span>
            ) : (
              <span>
                Хуткасць ветру: {speed}м/с
              </span>
            )}
          </div>

          <div className='feel'>
            {currentScale === 'far' ? (
              <span>
                {`${(speedDescription as any)[currentLang]} ${(feel / 1 * 1.8 + 32).toFixed()} °F`}
              </span>
            ) : (
              <span>
                {`${(speedDescription as any)[currentLang]} ${(feel / 1).toFixed()} °C`}
              </span>
            )}
          </div>

          <div className='humidity'>
            <span>
              {currentLang === 'ru' ? (
                `Влажность: ${humidity}%`
              ) : currentLang === 'en' ? (
                `Humidity: ${humidity}%`
              ) : (
                `Вільготнасць: ${humidity}%`
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;
