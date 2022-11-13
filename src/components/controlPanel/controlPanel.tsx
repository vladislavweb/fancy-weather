import { useContext } from "react";
import { BackgroundContext, SettingsContext } from "../../providers";
import { Language, Scale } from "../../types";
import Button from "../button";
import "./controlPanel.css";

const ControlPanel = () => {
  const { updateBackgroundImage } = useContext(BackgroundContext);
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
      <Button className="Change-back" onClick={updateBackgroundImage} />

      <Button className="Speak-weather" onClick={speakWeather}>
        " "
      </Button>

      <Button
        className={language === Language.RU ? "lang-ru control-current" : "lang-ru"}
        onClick={() => {
          changeLanguage(Language.RU);
          localStorage.setItem("language", "ru");
        }}
      >
        RU
      </Button>

      <Button
        className={language === Language.EN ? "lang-en control-current" : "lang-en"}
        onClick={() => {
          changeLanguage(Language.EN);
          localStorage.setItem("language", "en");
        }}
      >
        EN
      </Button>

      <Button
        className={language === Language.UA ? "lang-ua control-current" : "lang-ua"}
        onClick={() => {
          changeLanguage(Language.UA);
          localStorage.setItem("language", "ua");
        }}
      >
        UA
      </Button>

      <Button
        className={scale === Scale.FAR ? "scale-far control-current" : "scale-far"}
        onClick={() => {
          changeScale(Scale.FAR);
          localStorage.setItem("scale", Scale.FAR);
        }}
      >
        °F
      </Button>

      <Button
        className={scale === Scale.CEL ? "scale-cel control-current" : "scale-cel"}
        onClick={() => {
          changeScale(Scale.CEL);
          localStorage.setItem("scale", Scale.CEL);
        }}
      >
        °C
      </Button>
    </div>
  );
};

export default ControlPanel;
