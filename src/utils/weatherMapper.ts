import { WeatherResponse } from "types";
import { getWeatherImage } from "utils";

export interface WeatherNow {
  description: string;
  speed: number;
  humidity: number;
  feel: number;
  temp: number;
  img?: string;
}

export interface WeatherThreeDays {
  avgTemp: number;
  description: string;
  img?: string;
}

export interface WeatherMap {
  weatherNow: WeatherNow;
  weatherThreeDays: WeatherThreeDays[];
}

export const weatherMapper = (weatherData: WeatherResponse): WeatherMap => {
  return {
    weatherNow: {
      description: weatherData.list[0].weather[0].description,
      speed: weatherData.list[0].wind.speed,
      humidity: weatherData.list[0].main.humidity,
      feel: weatherData.list[0].main.feels_like,
      temp: weatherData.list[0].main.temp,
      img: getWeatherImage(
        weatherData.list[0].sys.pod,
        weatherData.list[0].weather[0].icon.substring(0, 2),
      ),
    },
    weatherThreeDays: [
      {
        avgTemp: (weatherData.list[8].main.temp_max + weatherData.list[8].main.temp_min) / 2,
        description: weatherData.list[8].weather[0].description,
        img: getWeatherImage(
          weatherData.list[8].sys.pod,
          weatherData.list[8].weather[0].icon.substring(0, 2),
        ),
      },
      {
        avgTemp: (weatherData.list[16].main.temp_max + weatherData.list[16].main.temp_min) / 2,
        description: weatherData.list[16].weather[0].description,
        img: getWeatherImage(
          weatherData.list[16].sys.pod,
          weatherData.list[16].weather[0].icon.substring(0, 2),
        ),
      },
      {
        avgTemp: (weatherData.list[24].main.temp_max + weatherData.list[24].main.temp_min) / 2,
        description: weatherData.list[24].weather[0].description,
        img: getWeatherImage(
          weatherData.list[24].sys.pod,
          weatherData.list[24].weather[0].icon.substring(0, 2),
        ),
      },
    ],
  };
};
