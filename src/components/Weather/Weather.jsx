import React, { useState, useEffect, useContext } from 'react';
import { WeatherContext } from '../../Context/WeatherContext';
import ThreeDays from './ThreeDays/ThreeDays';
import Today from './Today/Today';
import Loader from '../UI/Loader/Loader';
import './Weather.css';

const Weather = () => {
  const { getData, fetchDataWeather, location, settings } = useContext(WeatherContext);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const getDataWeather = async (position) => {
    try {
      await getData(true, position);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (fetchDataWeather) {
      setIsDataLoaded(true);
    }
  }, [fetchDataWeather, location, settings]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getDataWeather(position);
    });
  }, []);

  console.log('Weather');

  return (
    <div className='Weather'>
      {isDataLoaded
        ? (
            <React.Fragment>
              <Today
                weatherData={fetchDataWeather.weatherNow}
                location={location}
                settings={settings}
              />

              <ThreeDays
                settings={settings}
                weatherData={fetchDataWeather.weatherThreeDays}
              />
            </React.Fragment>
          )
        : <Loader />
      }
    </div>
  );
};

export default Weather;
