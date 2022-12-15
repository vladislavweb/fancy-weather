import axios from "axios";
import config from "../application.json";
import { MapQuestResponse, MapQuestTypeRequest } from "../types";

type FetchMapQuestData = (
  type?: MapQuestTypeRequest,
  location?: string,
) => Promise<MapQuestResponse>;

const fetchMapQuestData: FetchMapQuestData = async (
  type = MapQuestTypeRequest.reverse,
  location = "",
) => {
  const { url: mapQuestUrl, token } = config.mapQuestApi;

  const url = `${mapQuestUrl}${type}?key=${token}&location=${location}`;

  return await axios.get<MapQuestResponse>(url).then((res) => res.data);
};

export default fetchMapQuestData;
