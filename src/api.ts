import { get } from "./utils/get";
const link = "https://api.openweathermap.org/data/2.5/forecast?";
const keyWeather = "eac54b3672659f3dd10f71d884f30279";
const tokenMap = "pk.eyJ1IjoiaGltaW1ldHN1IiwiYSI6ImNrYWNtZ3VheDBuc3gyc284djVrOW50MnUifQ.CKQQ3zFcMaaQWHB-vZ8KLQ";
const tokenGeo = "BtHcuGO81EUArGaV164zvKD5sTuERK2O";
const urlGeo = "https://www.mapquestapi.com/geocoding/v1/address?key=";
const geoReverse = "https://open.mapquestapi.com/geocoding/v1/reverse?key=";
const unsplashUrl = "https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&&query=";
const unsplashKey = "&client_id=e_Ud2DTXMi01AovDee1hT-um5Qo2a7hdDmNmPxpk1W4";
import app from "./application.json";
export const fetchCoordinates = async (searchString: string) => {
  const urlGeo = get(app, "mapQuestApi.url.geocoding");
  return fetch(`${urlGeo}${tokenGeo}&location=${searchString}`)
    .then((data) => data.json())
    .catch((error) => console.log(error));
};

export const fetchCountry = async (long: any, lat: any) => {
  return fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?&lang=rutypes=country&access_token=${tokenMap}`,
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export const fetchCity = async (searchString: string) => {
  return fetch(`${urlGeo}${tokenGeo}&location=${searchString}`)
    .then((data) => data.json())
    .catch((error) => console.log(error));
};

export const fetchCityByDefaultPosition = async (lat: any, long: any) => {
  return fetch(`${geoReverse}${tokenGeo}&location=${lat},${long}`)
    .then((data) => data.json())
    .catch((error) => console.log(error));
};

export const fetchWeather = async (lat: any, long: any) => {
  const request = async (lang: any) => {
    return fetch(`${link}lat=${lat}&lon=${long}&appid=${keyWeather}&lang=${lang}&cnt=32&units=metric`).then((res) =>
      res.json(),
    );
  };

  const weathers = {
    ru: "",
    en: "",
    ua: "",
  };

  try {
    weathers.ru = await request("ru");
    weathers.en = await request("en");
    weathers.ua = await request("ua");

    return weathers;
  } catch (error) {
    throw error;
  }
};

export const fetchPicture = async (day: string, weather: string) => {
  return fetch(`${unsplashUrl}${day} ${weather}${unsplashKey}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
};
