import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ConfigContext } from "../config";
import { WeatherResponse } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { Coordinates } from "../mapQuest";
import { SettingsContext } from "../settings";
import { WeatherMap, weatherMapper } from "../../utils";

type Props = FC<{ children?: ReactNode }>;

interface WeatherApiProvider {
  isLoading: boolean;
  weather?: WeatherMap;
  changeCoordinates: (coordinates: Coordinates) => void;
}

export const Context = createContext<WeatherApiProvider>({
  isLoading: false,
  changeCoordinates: () => undefined,
});

export const WeatherProvider: Props = ({ children }) => {
  const { openWeatherMap } = useContext(ConfigContext);
  const { language } = useContext(SettingsContext);
  const [weather, setWeather] = useState<WeatherMap>();
  const [coordinates, setCoordinates] = useState<Coordinates>();

  const fetchWeather = useCallback(async () => {
    const { url, key } = openWeatherMap;

    const URL = `${url}lat=${coordinates?.lat}&lon=${coordinates?.long}&appid=${key}&lang=${language}&cnt=32&units=metric`;

    return await axios.get<WeatherResponse>(URL).then((res) => res.data);
  }, [coordinates]);

  const { refetch, isLoading, data } = useQuery({
    queryKey: [],
    queryFn: fetchWeather,
    onSuccess: useCallback(() => {
      if (data) {
        setWeather(weatherMapper(data));
      }
    }, [coordinates]),
    enabled: false,
  });

  const changeCoordinates = (coordinates: Coordinates) => setCoordinates(coordinates);

  useEffect(() => {
    if (coordinates) {
      refetch();
    }
  }, [coordinates]);

  return (
    <Context.Provider value={{ isLoading, weather, changeCoordinates }}>
      {children}
    </Context.Provider>
  );
};
