import React, { useContext, FC } from "react";
import ThreeDays from "./threeDays";
import Today from "./today";
import { Loader } from "components";
import { weatherMapper } from "utils";
import { DataContext } from "providers";
import "./weather.scss";

const Weather: FC = () => {
  const { data, dataIsLoading } = useContext(DataContext);
  const weather = data?.weatherData ? weatherMapper(data.weatherData) : undefined;

  return (
    <div className="weather">
      {!dataIsLoading && (
        <React.Fragment>
          {weather?.weatherNow && <Today weatherData={weather.weatherNow} />}

          {weather?.weatherThreeDays && <ThreeDays weatherData={weather.weatherThreeDays} />}
        </React.Fragment>
      )}

      {dataIsLoading && <Loader />}
    </div>
  );
};

export default Weather;
