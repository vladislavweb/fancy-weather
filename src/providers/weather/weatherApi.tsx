import React, { useState, useContext, ReactNode, FC } from "react";
import { WeatherContext } from "./index";
import { MainContext } from "../../mainContext";
import { getWeatherImage } from "../../utils/getWeatherImage";
import {
  fetchCoordinates,
  fetchCountry,
  fetchCity,
  fetchWeather,
  fetchPicture,
  fetchCityByDefaultPosition,
} from "../../api";

interface WeatherProvider {
  children?: ReactNode;
}

const WeatherProvider: FC<WeatherProvider> = ({ children }) => {
  const [isRequestMap, setIsRequestMap] = useState(false);
  const [updateMap, setUpdateMap] = useState(false);
  const [fetchDataWeather, setFetchDataWeather] = useState<any>();
  const [location, setLocation] = useState({});
  const [settings, setSettings] = useState({
    currentLang: localStorage.getItem("language") || "en",
    currentScale: localStorage.getItem("scale") || "cel",
    showVirtualKeyboard: false,
  });
  const body = document.getElementsByTagName("body")[0];
  const { searchString, changeRequest } = useContext(MainContext);
  const { city, changeCity } = useContext(MainContext);
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);

  const changeShowVirtualKeyboard = () => setShowVirtualKeyboard(!showVirtualKeyboard);

  const changeBackground = (link: string) => {
    let image = new Image();
    image.src = link;
    image.onload = () => {
      body.setAttribute("style", `background-image: url(${link})`);
    };
  };

  const setSpeakWeather = (res: any) => {
    sessionStorage.setItem(
      "weather-en",
      `Weather today: ${
        res.en.list[0].weather[0].description
      }, wind speed ${res.en.list[0].wind.speed.toFixed(1)} meter per second, humidity ${
        res.en.list[0].main.humidity
      } percent, the temperature feels like ${res.en.list[0].main.feels_like.toFixed()} degrees.`,
    );

    sessionStorage.setItem(
      "weather-ru",
      `Погода сегодня: ${
        res.ru.list[0].weather[0].description
      }, скорость ветра ${res.ru.list[0].wind.speed.toFixed(1)} метров в секунду, влажность ${
        res.ru.list[0].main.humidity
      } процентов, температура ощущается как ${res.ru.list[0].main.feels_like.toFixed()} градусов.`,
    );

    sessionStorage.setItem(
      "weather-ua",
      `Погода сьогодні: ${
        res.ua.list[0].weather[0].description
      }, швидкість вітру ${res.ua.list[0].wind.speed.toFixed(1)} метрів в секунду, вологість ${
        res.ua.list[0].main.humidity
      } відсоток, температура відчувається як ${res.ua.list[0].main.feels_like.toFixed()} градус.`,
    );
  };

  const getData = async (useDefaultPosition = false, position: any) => {
    if (useDefaultPosition) {
      setIsRequestMap(false);
    } else {
      setIsRequestMap(true);
    }

    const coords = useDefaultPosition ? position : await fetchCoordinates(searchString);
    if (useDefaultPosition || coords.results[0].locations.length > 0) {
      if (useDefaultPosition || coords.results[0].locations[0].adminArea5.length > 0) {
        changeRequest(false);

        const lat = useDefaultPosition
          ? position.coords.latitude
          : coords.results[0].locations[0].latLng.lat;
        const long = useDefaultPosition
          ? position.coords.longitude
          : coords.results[0].locations[0].latLng.lng;

        const country = await fetchCountry(long, lat);
        const city = useDefaultPosition
          ? await fetchCityByDefaultPosition(lat, long)
          : await fetchCity(searchString);

        changeCity(city.results[0].locations[0].adminArea5);

        const weathers = (await fetchWeather(lat, long)) as any;

        let picture;
        switch (weathers.en.list[0].sys.pod) {
          case "n":
            picture = await fetchPicture("night", weathers.en.list[0].weather[0].main);
            sessionStorage.setItem("photo", `night ${weathers.en.list[0].weather[0].main}`);
            break;
          case "d":
            picture = await fetchPicture("day", weathers.en.list[0].weather[0].main);
            sessionStorage.setItem("photo", `day ${weathers.en.list[0].weather[0].main}`);
            break;
          default:
            throw Error("Ожидается n или d");
        }

        if (picture) {
          changeBackground(picture.urls.regular);
        }

        setSpeakWeather(weathers);

        setFetchDataWeather({
          weatherNow: {
            description: {
              ru: weathers.ru.list[0].weather[0].description,
              en: weathers.en.list[0].weather[0].description,
              ua: weathers.ua.list[0].weather[0].description,
            },
            speed: weathers.en.list[0].wind.speed,
            humidity: weathers.en.list[0].main.humidity,
            feel: weathers.en.list[0].main.feels_like,
            temp: weathers.en.list[0].main.temp,
            img: getWeatherImage(
              weathers.en.list[0].sys.pod,
              weathers.en.list[0].weather[0].icon.substring(0, 2),
            ),
          },
          weatherThreeDays: {
            ru: [
              {
                avgTemp:
                  (weathers.ru.list[8].main.temp_max + weathers.ru.list[8].main.temp_min) / 2,
                description: weathers.ru.list[8].weather[0].description,
                img: getWeatherImage(
                  weathers.ru.list[8].sys.pod,
                  weathers.ru.list[8].weather[0].icon.substring(0, 2),
                ),
              },
              {
                avgTemp:
                  (weathers.ru.list[16].main.temp_max + weathers.ru.list[16].main.temp_min) / 2,
                description: weathers.ru.list[16].weather[0].description,
                img: getWeatherImage(
                  weathers.ru.list[16].sys.pod,
                  weathers.ru.list[16].weather[0].icon.substring(0, 2),
                ),
              },
              {
                avgTemp:
                  (weathers.ru.list[24].main.temp_max + weathers.ru.list[24].main.temp_min) / 2,
                description: weathers.ru.list[24].weather[0].description,
                img: getWeatherImage(
                  weathers.ru.list[24].sys.pod,
                  weathers.ru.list[24].weather[0].icon.substring(0, 2),
                ),
              },
            ],
            en: [
              {
                avgTemp:
                  (weathers.en.list[8].main.temp_max + weathers.en.list[8].main.temp_min) / 2,
                description: weathers.en.list[8].weather[0].description,
                img: getWeatherImage(
                  weathers.en.list[8].sys.pod,
                  weathers.en.list[8].weather[0].icon.substring(0, 2),
                ),
              },
              {
                avgTemp:
                  (weathers.en.list[16].main.temp_max + weathers.en.list[16].main.temp_min) / 2,
                description: weathers.en.list[16].weather[0].description,
                img: getWeatherImage(
                  weathers.en.list[16].sys.pod,
                  weathers.en.list[16].weather[0].icon.substring(0, 2),
                ),
              },
              {
                avgTemp:
                  (weathers.en.list[24].main.temp_max + weathers.en.list[24].main.temp_min) / 2,
                description: weathers.en.list[24].weather[0].description,
                img: getWeatherImage(
                  weathers.en.list[24].sys.pod,
                  weathers.en.list[24].weather[0].icon.substring(0, 2),
                ),
              },
            ],
            ua: [
              {
                avgTemp:
                  (weathers.ua.list[8].main.temp_max + weathers.ua.list[8].main.temp_min) / 2,
                description: weathers.ua.list[8].weather[0].description,
                img: getWeatherImage(
                  weathers.ua.list[8].sys.pod,
                  weathers.ua.list[8].weather[0].icon.substring(0, 2),
                ),
              },
              {
                avgTemp:
                  (weathers.ua.list[16].main.temp_max + weathers.ua.list[16].main.temp_min) / 2,
                description: weathers.ua.list[16].weather[0].description,
                img: getWeatherImage(
                  weathers.ua.list[16].sys.pod,
                  weathers.ua.list[16].weather[0].icon.substring(0, 2),
                ),
              },
              {
                avgTemp:
                  (weathers.ua.list[24].main.temp_max + weathers.ua.list[24].main.temp_min) / 2,
                description: weathers.ua.list[24].weather[0].description,
                img: getWeatherImage(
                  weathers.ua.list[24].sys.pod,
                  weathers.ua.list[24].weather[0].icon.substring(0, 2),
                ),
              },
            ],
          },
        });

        setLocation({
          city: city.results[0].locations[0].adminArea5,
          country: country.features[0].place_name,
        });

        if (!useDefaultPosition) {
          setUpdateMap(true);
        }
      } else {
        changeRequest(true);
      }
    }
  };

  const changeUpdateMap = (value: any) => setUpdateMap(value);
  const changeIsRequestMap = (value: any) => setIsRequestMap(value);
  const changeSettings = (value: any) => setSettings(value);

  return (
    <WeatherContext.Provider
      value={{
        city,
        getData,
        updateMap,
        changeUpdateMap,
        changeIsRequestMap,
        isRequestMap,
        showVirtualKeyboard,
        changeShowVirtualKeyboard,
        fetchDataWeather,
        location,
        settings,
        changeSettings,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
