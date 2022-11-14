import React, { useEffect, useContext } from "react";
import { WeatherContext } from "../../providers/weather";
import ThreeDays from "./threeDays";
import Today from "./today";
import Loader from "../loader";
import { MapQuestContext } from "../../providers/mapQuest";
import "./weather.css";

const Weather = () => {
  const { weather, isLoading, changeCoordinates } = useContext(WeatherContext);
  const { coordinates } = useContext(MapQuestContext);

  useEffect(() => {
    if (coordinates) {
      changeCoordinates(coordinates);
    }
  }, [coordinates]);

  return (
    <div className="weather">
      {!isLoading ? (
        <React.Fragment>
          {weather?.weatherNow && (
            <Today
              weatherData={weather?.weatherNow}
              // location={location}
            />
          )}

          {weather?.weatherThreeDays && <ThreeDays weatherData={weather?.weatherThreeDays} />}
        </React.Fragment>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Weather;
