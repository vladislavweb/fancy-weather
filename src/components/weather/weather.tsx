import React, { useContext, FC } from "react";
import { WeatherContext } from "../../providers/weather";
import ThreeDays from "./threeDays";
import Today from "./today";
import Loader from "../loader";
import "./weather.css";

const Weather: FC = () => {
  const { weather, isLoading } = useContext(WeatherContext);

  return (
    <div className="weather">
      {!isLoading && (
        <React.Fragment>
          {weather?.weatherNow && (
            <Today
              weatherData={weather?.weatherNow}
              // location={location}
            />
          )}

          {weather?.weatherThreeDays && <ThreeDays weatherData={weather?.weatherThreeDays} />}
        </React.Fragment>
      )}

      {isLoading && <Loader />}
    </div>
  );
};

export default Weather;
