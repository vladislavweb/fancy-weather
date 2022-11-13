import React from "react";
import WeatherCard from "./weatherCard";
import "./threeDays.css";

const ThreeDays = ({ weatherData, settings }: any) => {
  const { currentLang, currentScale } = settings;

  return (
    <div className="three-days">
      {weatherData[currentLang].map((weather: any, index: any) => {
        return (
          <WeatherCard
            weather={weather}
            key={index}
            next={index + 1}
            scale={currentScale}
            lang={currentLang}
          />
        );
      })}
    </div>
  );
};

export default ThreeDays;
