import {
  BackgroundResponse,
  Coordinates,
  Language,
  MapBoxResponse,
  MapQuestResponse,
  MapQuestTypeRequest,
  WeatherResponse,
} from "types";
import fetchMapBoxData from "./mapBox";
import fetchMapQuestData from "./mapQuest";
import fetchBackgroundImage from "./unsplash";
import fetchWeather from "./weather";

export enum TypeFetchData {
  COORDINATES = "COORDINATES",
  SEARCH_STRING = "SEARCH_STRING",
}

export interface FetchDataParams {
  language: Language;
  type: TypeFetchData;
  coordinates?: Coordinates;
  searchString?: string;
}

export interface DataResponse {
  mapQuestData: MapQuestResponse;
  mapBoxData: MapBoxResponse;
  weatherData: WeatherResponse;
  backgroundData: BackgroundResponse;
  coordinates?: Coordinates;
}

type FetchData = (params: FetchDataParams) => Promise<DataResponse | undefined>;

const fetchData: FetchData = async ({ language, type, coordinates, searchString }) => {
  if (type === TypeFetchData.COORDINATES && coordinates) {
    const { lat, long } = coordinates;

    const mapQuestData = await fetchMapQuestData(MapQuestTypeRequest.reverse, `${lat},${long}`);

    const mapBoxData = await fetchMapBoxData(coordinates, language);

    const weatherData = await fetchWeather(coordinates, language);

    const backgroundData = await fetchBackgroundImage(
      language,
      mapBoxData.features?.[0].place_name,
    );

    return { mapQuestData, mapBoxData, weatherData, backgroundData, coordinates };
  }

  if (type === TypeFetchData.SEARCH_STRING && searchString) {
    const mapQuestData = await fetchMapQuestData(MapQuestTypeRequest.geocoding, searchString);

    const coordinates: Coordinates = {
      lat: mapQuestData.results[0].locations[0].latLng.lat,
      long: mapQuestData.results[0].locations[0].latLng.lng,
    };

    const mapBoxData = await fetchMapBoxData(coordinates, language);

    const weatherData = await fetchWeather(coordinates, language);

    const backgroundData = await fetchBackgroundImage(
      language,
      mapBoxData.features?.[0].place_name,
    );

    return { mapQuestData, mapBoxData, weatherData, backgroundData, coordinates };
  }
};

export default fetchData;
