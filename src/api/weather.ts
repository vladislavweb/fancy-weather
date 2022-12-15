import axios from "axios";
import config from "../application.json";
import { Coordinates, Language, WeatherResponse } from "../types";

type FetchWeather = (coordinates: Coordinates, langauge: Language) => Promise<WeatherResponse>;

const fetchWeather: FetchWeather = async (coordinates, language) => {
  const { url, key } = config.openWeatherMap;

  const weatherUrl = `${url}lat=${coordinates.lat}&lon=${coordinates.long}&appid=${key}&lang=${language}&cnt=32&units=metric`;

  return await axios.get<WeatherResponse>(weatherUrl).then((res) => res.data);
};

export default fetchWeather;
