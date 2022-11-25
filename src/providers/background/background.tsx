import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ConfigContext } from "../config";
import { BackgroundResponse } from "../../types";
import { MapBoxContext } from "../mapBox";

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
          `${unsplash.url}${mapBoxData?.features?.[0].place_name}${unsplash.key}`,
        )
        .then((res) => res.data),
    [mapBoxData],
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
