import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { MapQuestResponse, TypeRequest } from "../../types";
import { ConfigContext } from "../config";
import { useQuery } from "@tanstack/react-query";

type Props = FC<{ children?: ReactNode }>;

export type Coordinates = {
  lat: number;
  long: number;
};

interface MapQuestData {
  typeRequest: TypeRequest;
  searchString: string;
}

interface MapQuestProviderInterface {
  isLoading: boolean;
  mapQuestData?: MapQuestData;
  places?: MapQuestResponse;
  coordinates?: Coordinates;
  changeMapQuestData: (data: MapQuestData) => void;
  changeCoordinates: (coordinates: Coordinates) => void;
}

export const Context = createContext<MapQuestProviderInterface>({
  isLoading: false,
  changeMapQuestData: () => undefined,
  changeCoordinates: () => undefined,
});

export const MapQuestProvider: Props = ({ children }) => {
  const { mapQuestApi } = useContext(ConfigContext);
  const [mapQuestData, setMapQuestData] = useState<MapQuestData>();
  const [places, setPlaces] = useState<MapQuestResponse>();
  const [coordinates, setCoordinates] = useState<Coordinates>();

  const fetchMapQuestData = useCallback(async () => {
    const type =
      mapQuestData?.typeRequest === TypeRequest.geocoding
        ? TypeRequest.geocoding
        : TypeRequest.reverse;

    const location = mapQuestData?.searchString;

    const url = `${mapQuestApi.url}${type}?key=${mapQuestApi.token}&location=${location}`;

    return await axios.get<MapQuestResponse>(url).then((res) => res.data);
  }, [mapQuestData]);

  const { refetch, isFetching } = useQuery({
    queryKey: ["fetchMapQuestData", ...Object.values(mapQuestData || {})],
    staleTime: Infinity,
    retry: 0,
    queryFn: fetchMapQuestData,
    onSuccess: (res) => {
      if (res.results[0].locations.length) {
        setCoordinates({
          lat: res.results[0].locations[0].latLng.lat,
          long: res.results[0].locations[0].latLng.lng,
        });
      }

      setPlaces(res);
    },
    enabled: false,
  });

  const changeMapQuestData = (data: MapQuestData) => setMapQuestData(data);
  const changeCoordinates = (coordinates: Coordinates) => setCoordinates(coordinates);

  useEffect(() => {
    if (mapQuestData) {
      refetch();
    }
  }, [mapQuestData]);

  return (
    <Context.Provider
      value={{
        isLoading: isFetching,
        mapQuestData,
        places,
        coordinates,
        changeMapQuestData,
        changeCoordinates,
      }}
    >
      {children}
    </Context.Provider>
  );
};
