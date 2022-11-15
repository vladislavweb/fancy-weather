import { FC, useContext } from "react";
import data from "../../../../assets/data";
import { SettingsContext } from "../../../../providers";
import { Scale } from "../../../../types";
import { WeatherThreeDays } from "../../../../utils";
import "./weatherCard.css";

interface Props {
  weather: WeatherThreeDays;
  next: number;
}

const WeatherCard: FC<Props> = ({ weather, next }) => {
  const { scale, language } = useContext(SettingsContext);

  return (
    <div className="weather-card">
      <div className="date">
        <span>
          {data.days[language][new Date().getDay() + next]} &nbsp;
          {data.months[language][new Date().getMonth()]} &nbsp;
          {new Date().getDate() + next} &nbsp;
          {new Date().getFullYear()}
        </span>
      </div>

      <div className="weather-info">
        <div className="weather-description">
          <span>{weather.description}</span>
        </div>
        <div className={`weather-three-icon ${weather.img}`}></div>
      </div>

      <div className="temperature">
        <span>
          {scale === Scale.FAR
            ? `${(weather.avgTemp * 1.8 + 32).toFixed()} °F`
            : `${weather.avgTemp.toFixed()} °C`}
        </span>
      </div>
    </div>
  );
};

export default WeatherCard;
