import axios from "axios";
import config from "../application.json";
import { Coordinates, Language, MapBoxResponse } from "../types";

type FetchMapBoxData = (coordinates: Coordinates, langauge: Language) => Promise<MapBoxResponse>;

const fetchMapBoxData: FetchMapBoxData = async (coordinates, language) => {
  const { url: mapBoxUrl, token } = config.mapBox;
  const searchText = `${coordinates.long},${coordinates.lat}`;
  const url = `${mapBoxUrl}/${searchText}.json?language=${language}&types=country,place&access_token=${token}`;

  return await axios.get<MapBoxResponse>(url).then((res) => res.data);
};

export default fetchMapBoxData;
