import { useContext } from "react";
import { SettingsContext } from "../../../providers";
import WeatherCard from "./weatherCard";
import "./threeDays.css";

const ThreeDays = ({ weatherData }: any) => {
  const { language } = useContext(SettingsContext);

  return (
    <div className="three-days">
      {weatherData[language].map((weather: any, index: any) => {
        return <WeatherCard weather={weather} key={index} next={index + 1} />;
      })}
    </div>
  );
};

export default ThreeDays;
