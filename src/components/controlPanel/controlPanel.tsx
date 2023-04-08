import { FC, useCallback, useContext } from "react";
import classNames from "classnames";
import { DataContext, SettingsContext } from "providers";
import { Language, LocalWeather, Scale } from "types";
import { Button, IconButton } from "components";
import { setBackgroundImage } from "utils";
import { fetchBackgroundImage } from "api";
import { ReactComponent as RefreshIcon } from "./assets/refresh.svg";
import { ReactComponent as SoundIcon } from "./assets/sound.svg";
import { ReactComponent as CelsiusIcon } from "./assets/celsius.svg";
import { ReactComponent as FarenheitIcon } from "./assets/farenheit.svg";
import Divider from "../divider";
import "./controlPanel.scss";

const ControlPanel: FC = () => {
  const { searchString, backgroundImageIsLoading, changeBackgroundImageIsLoading } =
    useContext(DataContext);
  const { scale, language, changeScale, changeLanguage } = useContext(SettingsContext);

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
      <div className="control-panel__layout">
        <div className="control-panel__actions-wrapper">
          <IconButton
            className="control-panel__button"
            disabled={backgroundImageIsLoading}
            onClick={updateBackgroundHandler}
          >
            <RefreshIcon />
          </IconButton>

          <Divider />

          <IconButton className="control-panel__button" onClick={speakWeather}>
            <SoundIcon />
          </IconButton>
        </div>

        <div className="control-panel__selectors-wrapper">
          <Button
            className={classNames("control-panel__button", "select-button", "center", {
              "select-button--selected": language === Language.RU,
            })}
            onClick={() => {
              changeLanguage(Language.RU);
            }}
          >
            RU
          </Button>

          <Divider />

          <Button
            className={classNames("control-panel__button", "select-button", "center", {
              "select-button--selected": language === Language.EN,
            })}
            onClick={() => {
              changeLanguage(Language.EN);
            }}
          >
            EN
          </Button>

          <Divider />

          <Button
            className={classNames("control-panel__button", "select-button", "center", {
              "select-button--selected": language === Language.UK,
            })}
            onClick={() => {
              changeLanguage(Language.UK);
            }}
          >
            UK
          </Button>
        </div>

        <div className="control-panel__selectors-wrapper">
          <IconButton
            className={classNames("control-panel__button", "select-button", {
              "select-button--selected": scale === Scale.FAR,
            })}
            onClick={() => {
              changeScale(Scale.FAR);
            }}
          >
            <FarenheitIcon />
          </IconButton>

          <Divider />

          <IconButton
            className={classNames("control-panel__button", "select-button", {
              "select-button--selected": scale === Scale.CEL,
            })}
            onClick={() => {
              changeScale(Scale.CEL);
            }}
          >
            <CelsiusIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
