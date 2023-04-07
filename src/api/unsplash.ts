import axios from "axios";
import config from "../application.json";
import { BackgroundResponse, Language } from "types";

type FetchBackgroundImage = (
  language: Language,
  queryString: string,
) => Promise<BackgroundResponse>;

const fetchBackgroundImage: FetchBackgroundImage = async (language, queryString) => {
  const { url, key } = config.unsplash;

  return await axios
    .get<BackgroundResponse>(`${url}${language === Language.EN ? queryString : ""}${key}`)
    .then((res) => res.data);
};

export default fetchBackgroundImage;
