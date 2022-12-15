import { FC, useCallback, useContext } from "react";
import classNames from "classnames";
import { DataContext, SettingsContext } from "../../providers";
import { Language, LocalWeather, Scale } from "../../types";
import Button from "../button";
import { Store } from "../../service";
import { setBackgroundImage } from "../../utils";
import { fetchBackgroundImage } from "../../api";
import "./controlPanel.scss";

const ControlPanel: FC = () => {
  const { searchString, backgroundImageIsLoading, changeBackgroundImageIsLoading } =
    useContext(DataContext);
  const { scale, language, changeScale, changeLanguage } = useContext(SettingsContext);
  const localWeather = new Store<LocalWeather>("weather");

  const speakWeather = () => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();

    if (synth.speaking) {
      synth.cancel();
    }

    const utterThis = new SpeechSynthesisUtterance(localWeather.read()?.weather || "");
    utterThis.voice = voices[3];
    utterThis.lang = `${localWeather.read()?.language || Language.EN}-US`;
    utterThis.rate = 0.8;

    synth.speak(utterThis);
  };

  const updateBackgroundHandler = useCallback(() => {
    fetchBackgroundImage(language, searchString).then((res) => {
      setBackgroundImage({
        imageData: res,
        onStart: () => changeBackgroundImageIsLoading(true),
        onEnd: () => changeBackgroundImageIsLoading(false),
      });
    });
  }, [searchString]);

  return (
    <div className="control-panel">
      <Button
        className="update-background"
        disabled={backgroundImageIsLoading}
        onClick={updateBackgroundHandler}
      />

      <Button className="speak-weather" onClick={speakWeather} />

      <Button
        className={classNames("lang-ru", {
          "current-control": language === Language.RU,
        })}
        onClick={() => {
          changeLanguage(Language.RU);
        }}
      >
        RU
      </Button>

      <Button
        className={classNames("lang-en", {
          "current-control": language === Language.EN,
        })}
        onClick={() => {
          changeLanguage(Language.EN);
        }}
      >
        EN
      </Button>

      <Button
        className={classNames("lang-uk", {
          "current-control": language === Language.UK,
        })}
        onClick={() => {
          changeLanguage(Language.UK);
        }}
      >
        UK
      </Button>

      <Button
        className={classNames("scale-far", {
          "current-control": scale === Scale.FAR,
        })}
        onClick={() => {
          changeScale(Scale.FAR);
        }}
      >
        °F
      </Button>

      <Button
        className={classNames("scale-cel", {
          "current-control": scale === Scale.CEL,
        })}
        onClick={() => {
          changeScale(Scale.CEL);
        }}
      >
        °C
      </Button>
    </div>
  );
};

export default ControlPanel;
