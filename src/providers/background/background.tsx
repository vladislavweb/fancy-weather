import { createContext, FC, ReactNode, useCallback, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ConfigContext } from "../config";
import { MapBoxContext } from "../mapBox";
import { SettingsContext } from "../settings";
import { BackgroundResponse, Language } from "../../types";

type Props = FC<{ children?: ReactNode }>;

interface BackgroundInterface {
  isLoading: boolean;
  updateBackgroundImage: () => void;
}

const body = document.querySelector("body");

export const Context = createContext<BackgroundInterface>({
  isLoading: false,
  updateBackgroundImage: () => undefined,
});

export const BackgroundProvider: Props = ({ children }) => {
  const { mapBoxData } = useContext(MapBoxContext);
  const { unsplash } = useContext(ConfigContext);
  const { language } = useContext(SettingsContext);

  const setBackgroundImage = (imageData?: BackgroundResponse) => {
    if (body && imageData) {
      const image = new Image();
      image.src = imageData.urls.regular;

      image.onload = () => {
        body.setAttribute("style", `background-image: url(${imageData.urls.regular})`);
      };
    }
  };

  const fetchBackgroundPicture = useCallback(async () => {
    const queryString = language === Language.EN ? mapBoxData?.features?.[0].place_name : "";

    return await axios
      .get<BackgroundResponse>(`${unsplash.url}${queryString}${unsplash.key}`)
      .then((res) => res.data);
  }, [mapBoxData, unsplash.url, unsplash.key, language]);

  const { refetch, isFetching } = useQuery({
    queryKey: ["fetchBackgroundPicture"],
    retry: 0,
    queryFn: fetchBackgroundPicture,
    onSuccess: (res) => {
      setBackgroundImage(res);
    },
    enabled: false,
  });

  const updateBackgroundImage = useCallback(async () => {
    await refetch();
  }, [mapBoxData]);

  useEffect(() => {
    if (mapBoxData) {
      refetch();
    }
  }, [mapBoxData]);

  return (
    <Context.Provider value={{ isLoading: isFetching, updateBackgroundImage }}>
      {children}
    </Context.Provider>
  );
};
