import React from 'react';
import WeatherCard from './WeatherCard/WeatherCard';
import './ThreeDays.css';

const ThreeDays = ({ weatherData, settings }) => {
  const { currentLang, currentScale } = settings;
  console.log('Three days');

  return (
    <div className='ThreeDays'>
      {weatherData[currentLang].map((weather, index) => {
        return (
          <WeatherCard
            weather={weather}
            key={index}
            next={index + 1}
            scale={currentScale}
            lang={currentLang}
          />
        )
      })}
    </div>
  );
};

export default ThreeDays;
