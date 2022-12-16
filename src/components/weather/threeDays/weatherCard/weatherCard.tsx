import { FC, useContext } from "react";
import classNames from "classnames";
import data from "../../../../assets/data";
import { SettingsContext } from "../../../../providers";
import { Scale } from "../../../../types";
import { WeatherThreeDays } from "../../../../utils";
import "./weatherCard.scss";

interface Props {
  weather: WeatherThreeDays;
  next: number;
}

const WeatherCard: FC<Props> = ({ weather, next }) => {
  const { scale, language } = useContext(SettingsContext);

  return (
    <div className="weather-card">
      <div className="weather-card__date date">
        <span className="date__text">
          {data.days[language][new Date().getDay() + next]} &nbsp;
          {data.months[language][new Date().getMonth()]} &nbsp;
          {new Date().getDate() + next} &nbsp;
          {new Date().getFullYear()}
        </span>
      </div>

      <div className="weather-card__info info">
        <div className="info__description">
          <span className="info__text">{weather.description}</span>
        </div>
        <div className={classNames("info__icon", weather.img)}></div>
      </div>

      <div className="weather-card__temperature temperature">
        <span className="temperature__text">
          {scale === Scale.FAR
            ? `${(weather.avgTemp * 1.8 + 32).toFixed()} °F`
            : `${weather.avgTemp.toFixed()} °C`}
        </span>
      </div>
    </div>
  );
};

export default WeatherCard;
