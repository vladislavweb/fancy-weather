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
  updateBackgroundImage: () => void;
}

const body = document.querySelector("body");

export const Context = createContext<BackgroundInterface>({
  isLoading: false,
  changeImageInformation: () => undefined,
  updateBackgroundImage: () => undefined,
});

export const BackgroundProvider: Props = ({ children }) => {
  const [imageInformation, setImageInformation] = useState<ImageInformation>();
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
          `${unsplash.url}${imageInformation?.timeOfDay} ${imageInformation?.weather}${unsplash.key}`,
        )
        .then((res) => res.data),
    [imageInformation],
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

  const changeImageInformation = (info: ImageInformation) => setImageInformation(info);

  const updateBackgroundImage = useCallback(async () => {
    await refetch();
  }, [imageInformation]);

  useEffect(() => {
    if (imageInformation) {
      refetch();
    }
  }, [imageInformation]);

  return (
    <Context.Provider
      value={{ isLoading: isFetching, changeImageInformation, updateBackgroundImage }}
    >
      {children}
    </Context.Provider>
  );
};
