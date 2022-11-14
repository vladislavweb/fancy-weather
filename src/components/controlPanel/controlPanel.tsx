import { FC, useContext } from "react";
import classNames from "classnames";
import { BackgroundContext, SettingsContext } from "../../providers";
import { Language, Scale } from "../../types";
import Button from "../button";
import "./controlPanel.css";

const ControlPanel: FC = () => {
  const { updateBackgroundImage, isLoading: backgroundIsLoading } = useContext(BackgroundContext);
  const { scale, language, changeScale, changeLanguage } = useContext(SettingsContext);

  const speakWeather = () => {
    let synth = window.speechSynthesis;
    let utterThis = new SpeechSynthesisUtterance(
      sessionStorage.getItem(`weather-${language}`) || "",
    );

    switch (language) {
      case "ru":
        utterThis.lang = `ru-US`;
        break;
      case "en":
        utterThis.lang = `en-US`;
        break;
      case "ua":
        utterThis.lang = `ua-US`;
        break;
      default:
    }

    synth.speak(utterThis);
  };

  return (
    <div className="control-panel">
      <Button
        disabled={backgroundIsLoading}
        className="update-background"
        onClick={updateBackgroundImage}
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
        className={classNames("lang-ua", {
          "current-control": language === Language.UA,
        })}
        onClick={() => {
          changeLanguage(Language.UA);
        }}
      >
        UA
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