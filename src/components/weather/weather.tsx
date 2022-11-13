import React, { useState, useEffect, useContext } from "react";
import { WeatherContext } from "../../providers/weather";
import ThreeDays from "./threeDays";
import Today from "./today";
import Loader from "../loader";
import "./weather.css";

const Weather = () => {
  const { getData, fetchDataWeather, location, settings } = useContext(WeatherContext);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const getDataWeather = async (position: any) => {
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

  return (
    <div className="weather">
      {isDataLoaded ? (
        <React.Fragment>
          <Today
            weatherData={fetchDataWeather.weatherNow}
            location={location}
            settings={settings}
          />

          <ThreeDays settings={settings} weatherData={fetchDataWeather.weatherThreeDays} />
        </React.Fragment>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Weather;
