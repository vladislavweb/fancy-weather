import Store from "./store";

import { LocalWeather } from "types/weather";
import { Language } from "types/settings";

const WeatherStore = new Store<LocalWeather>("weather", { language: Language.EN, weather: "" });

export default WeatherStore;
