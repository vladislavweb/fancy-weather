import { FC } from "react";
import WeatherCard from "./weatherCard";
import { WeatherThreeDays } from "../../../utils";
import "./threeDays.scss";

interface Props {
  weatherData: WeatherThreeDays[];
}

const ThreeDays: FC<Props> = ({ weatherData }) => (
  <div className="three-days">
    {weatherData.map((weather, index) => (
      <WeatherCard weather={weather} key={index} next={index + 1} />
    ))}
  </div>
);

export default ThreeDays;
