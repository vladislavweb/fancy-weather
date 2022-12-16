import { BackgroundResponse } from "../types";

interface Params {
  imageData: BackgroundResponse;
  onStart?: () => void;
  onEnd?: () => void;
}

type SetBackgroundImage = (params: Params) => Promise<void>;

export const setBackgroundImage: SetBackgroundImage = async ({ imageData, onStart, onEnd }) => {
  try {
    return await new Promise<void>((res, rej) => {
      if (onStart) {
        onStart();
      }

      const image = new Image();
      image.src = imageData.urls.regular;

      image.onload = () => {
        document.body.setAttribute("style", `background-image: url(${imageData.urls.regular})`);

        res();
      };

      image.onerror = () => {
        rej();
      };
    });
  } finally {
    if (onEnd) {
      onEnd();
    }
  }
};
