import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ConfigContext } from "../config";
import { WeatherResponse } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { MapQuestContext } from "../mapQuest";
import { SettingsContext } from "../settings";
import { WeatherMap, weatherMapper } from "../../utils";

type Props = FC<{ children?: ReactNode }>;

interface WeatherApiProvider {
  isLoading: boolean;
  weather?: WeatherMap;
}

export const Context = createContext<WeatherApiProvider>({
  isLoading: false,
});

export const WeatherProvider: Props = ({ children }) => {
  const { openWeatherMap } = useContext(ConfigContext);
  const { language } = useContext(SettingsContext);
  const { coordinates } = useContext(MapQuestContext);
  const [weather, setWeather] = useState<WeatherMap>();

  const fetchWeather = useCallback(async () => {
    const { url, key } = openWeatherMap;

    const weatherUrl = `${url}lat=${coordinates?.lat}&lon=${coordinates?.long}&appid=${key}&lang=${language}&cnt=32&units=metric`;

    return await axios.get<WeatherResponse>(weatherUrl).then((res) => res.data);
  }, [coordinates]);

  const { refetch, isFetching } = useQuery({
    queryKey: ["fetchWeather", ...Object.values(coordinates || {})],
    staleTime: Infinity,
    queryFn: fetchWeather,
    onSuccess: (res) => {
      setWeather(weatherMapper(res));
    },
    enabled: false,
  });

  useEffect(() => {
    if (coordinates) {
      refetch();
    }
  }, [coordinates]);

  return <Context.Provider value={{ isLoading: isFetching, weather }}>{children}</Context.Provider>;
};
