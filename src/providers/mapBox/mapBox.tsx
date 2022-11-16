import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ConfigContext } from "../config";
import { MapBoxResponse } from "../../types";
import { MapQuestContext } from "../mapQuest";
import { useQuery } from "@tanstack/react-query";
import { SettingsContext } from "../settings";

type Props = FC<{ children?: ReactNode }>;

interface MapBoxProviderInterface {
  isLoading: boolean;
  mapBoxData?: MapBoxResponse;
}

export const Context = createContext<MapBoxProviderInterface>({ isLoading: false });

export const MapBoxProvider: Props = ({ children }) => {
  const { mapBox } = useContext(ConfigContext);
  const { language } = useContext(SettingsContext);
  const { coordinates } = useContext(MapQuestContext);
  const [mapBoxData, setMapBoxData] = useState<MapBoxResponse>();

  const fetchMapBoxData = useCallback(async () => {
    const { url, token } = mapBox;
    const searchText = `${coordinates?.long},${coordinates?.lat}`;
    const URL = `${url}/${searchText}.json?language=${language}&types=country,place&access_token=${token}`;

    return await axios.get<MapBoxResponse>(URL).then((res) => res.data);
  }, [coordinates]);

  const { refetch, isFetching } = useQuery({
    queryKey: ["fetchMapQuestData", ...Object.values(coordinates || {})],
    staleTime: Infinity,
    retry: 0,
    queryFn: fetchMapBoxData,
    onSuccess: (res) => {
      setMapBoxData(res);
    },
    enabled: false,
  });

  useEffect(() => {
    if (coordinates) {
      refetch();
    }
  }, [coordinates]);

  return (
    <Context.Provider value={{ isLoading: isFetching, mapBoxData }}>{children}</Context.Provider>
  );
};
