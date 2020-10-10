import React, { useState, useEffect, useContext } from 'react';
import ThreeDays from './ThreeDays/ThreeDays';
import Today from './Today/Today';
import Loader from '../UI/Loader/Loader';
import { WeatherContext } from '../../Context/WeatherContext';
import './Weather.css';

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
      {isDataLoaded ? <Today/> : <Loader />}
      <ThreeDays/>
    </div>
  );
};

export default Weather;
