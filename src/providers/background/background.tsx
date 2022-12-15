import { createContext, FC, ReactNode, useCallback, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { usePreviousValue } from "../../hooks";

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

  const queryString = mapBoxData?.features?.[0].place_name;
  const prevQueryString = usePreviousValue(mapBoxData?.features?.[0].place_name);

  const setBackgroundImage = (imageData?: BackgroundResponse) => {
    if (body && imageData) {
      const image = new Image();
      image.src = imageData.urls.regular;

      image.onload = () => {
        body.setAttribute("style", `background-image: url(${imageData.urls.regular})`);
      };
    }
  };

  const fetchBackgroundPicture = useCallback(
    async () =>
      await axios
        .get<BackgroundResponse>(
          `${unsplash.url}${language === Language.EN ? queryString : ""}${unsplash.key}`,
        )
        .then((res) => res.data),
    [queryString, unsplash.url, unsplash.key, language],
  );

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
  }, [refetch]);

  useEffect(() => {
    if (queryString !== prevQueryString) {
      refetch();
    }
  }, [queryString, prevQueryString, refetch]);

  return (
    <Context.Provider value={{ isLoading: isFetching, updateBackgroundImage }}>
      {children}
    </Context.Provider>
  );
};
