import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ConfigContext } from "../config";
import { BackgroundResponse } from "../../types";

type Props = FC<{ children?: ReactNode }>;

interface ImageInformation {
  timeOfDay: string;
  weather: string;
}

interface BackgroundInterface {
  isLoading: boolean;
  changeImageInformation: (info: ImageInformation) => void;
}

const body = document.querySelector("body");

export const Context = createContext<BackgroundInterface>({
  changeImageInformation: () => undefined,
  isLoading: false,
});

export const BackgroundProvider: Props = ({ children }) => {
  const [imageInformation, setImageInformation] = useState<ImageInformation>();
  const { unsplash } = useContext(ConfigContext);

  const fetchBackgroundPicture = useCallback(
    async () =>
      await axios
        .get<BackgroundResponse>(
          `${unsplash.url}${imageInformation?.timeOfDay} ${imageInformation?.weather}${unsplash.key}`,
        )
        .then((res) => res.data),
    [imageInformation],
  );

  const { refetch, isLoading, data } = useQuery({
    queryKey: [],
    queryFn: fetchBackgroundPicture,
    onSuccess: useCallback(() => {
      if (body && data) {
        const image = new Image();
        image.src = data.urls.regular;

        image.onload = () => {
          body.setAttribute("style", `background-image: url(${data.urls.regular})`);
        };
      }
    }, [body, imageInformation]),
    enabled: false,
  });

  const changeImageInformation = (info: ImageInformation) => setImageInformation(info);

  useEffect(() => {
    if (imageInformation) {
      refetch();
    }
  }, [imageInformation]);

  return (
    <Context.Provider value={{ isLoading, changeImageInformation }}>{children}</Context.Provider>
  );
};
