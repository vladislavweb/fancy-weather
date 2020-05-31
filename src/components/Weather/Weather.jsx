import React, { useState, useEffect, useContext } from 'react';
import './Weather.css';
import ThreeDays from './ThreeDays/ThreeDays';
import { MainContext } from '../../MainContext';
import Today from './Today/Today';
import Loader from '../UI/Loader/Loader';
import { WeatherContext } from '../../Context/WeatherContext';

const Weather = props => {

  const { getData } = useContext(WeatherContext)
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const getDataWeather = async (position) => {
    await getData(true, position);
    setIsDataLoaded(true);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getDataWeather(position);
    });
  }, []);

  return (
    <div className='Weather'>
      {
        isDataLoaded && <Today/>
      }
      {
        !isDataLoaded ? <Loader/> : null
      }
      <ThreeDays/>
    </div>
  );
};

export default Weather;
