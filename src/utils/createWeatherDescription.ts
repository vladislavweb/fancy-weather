import { Language, LocalWeather, WeatherResponse } from "../types";

const getMainDescription = (weatherData: WeatherResponse, language: Language) => {
  const description = {
    en: `Weather today: ${weatherData.list[0].weather[0].description}, `,
    ru: `Погода сегодня: ${weatherData.list[0].weather[0].description}, `,
    uk: `Погода сьогодні: ${weatherData.list[0].weather[0].description}, `,
  };

  return description[language];
};

const getWindDescription = (weatherData: WeatherResponse, language: Language) => {
  const description = {
    en: `wind speed: ${weatherData.list[0].wind.speed.toFixed()} meter per second, `,
    ru: `скорость ветра: ${weatherData.list[0].wind.speed.toFixed()} метров в секунду, `,
    uk: `швидкість вітру: ${weatherData.list[0].wind.speed.toFixed()} метрів за секунду, `,
  };

  return description[language];
};

const getHumidityDescription = (weatherData: WeatherResponse, language: Language) => {
  const description = {
    en: `humidity: ${weatherData.list[0].main.humidity} percent, `,
    ru: `влажность: ${weatherData.list[0].main.humidity} процентов, `,
    uk: `вологість: ${weatherData.list[0].main.humidity} відсотків, `,
  };

  return description[language];
};

const getTemperatureDescription = (weatherData: WeatherResponse, language: Language) => {
  const description = {
    en: `the temperature feels like ${weatherData.list[0].main.feels_like} degrees.`,
    ru: `температура ощущается как ${weatherData.list[0].main.feels_like} градусов.`,
    uk: `температура відчувається як ${weatherData.list[0].main.feels_like} градусів.`,
  };

  return description[language];
};

export const createWeatherDescription = (
  weatherData?: WeatherResponse,
  language = Language.EN,
): LocalWeather => {
  if (!weatherData || !language) {
    return {
      weather: "",
      language,
    };
  }

  const description = getMainDescription(weatherData, language);
  const wind = getWindDescription(weatherData, language);
  const humidity = getHumidityDescription(weatherData, language);
  const temperature = getTemperatureDescription(weatherData, language);

  const weatherDescription = `${description}${wind}${humidity}${temperature}`;

  return {
    weather: weatherDescription,
    language,
  };
};
