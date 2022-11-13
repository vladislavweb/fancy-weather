import React, { useContext } from "react";
import { WeatherContext } from "../../providers/weather";
import Button from "../button";
import "./controlPanel.css";

const ControlPanel = () => {
  const { settings, changeSettings } = useContext(WeatherContext);
  const { currentLang, currentScale } = settings;

  const changeBackground = () => {
    const body = document.getElementsByTagName("body")[0];
    const unsplashUrl =
      "https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&&query=";
    const unsplashKey = "&client_id=e_Ud2DTXMi01AovDee1hT-um5Qo2a7hdDmNmPxpk1W4";
    let image = new Image();

    fetch(`${unsplashUrl}${sessionStorage.getItem("photo")}${unsplashKey}`)
      .then((res) => res.json())
      .then((res) => {
        image.src = res.urls.regular;
        image.onload = () => {
          body.setAttribute("style", `background-image: url(${res.urls.regular})`);
        };
      });
  };

  const speakWeather = () => {
    let synth = window.speechSynthesis;
    let utterThis = new SpeechSynthesisUtterance(
      sessionStorage.getItem(`weather-${currentLang}`) || "",
    );

    switch (currentLang) {
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
      <Button className="Change-back" onClick={changeBackground} />

      <Button className="Speak-weather" onClick={speakWeather}>
        " "
      </Button>

      <Button
        className={currentLang === "ru" ? "lang-ru control-current" : "lang-ru"}
        onClick={() => {
          changeSettings({
            ...settings,
            currentLang: "ru",
          });
          localStorage.setItem("language", "ru");
        }}
      >
        RU
      </Button>

      <Button
        className={currentLang === "en" ? "lang-en control-current" : "lang-en"}
        onClick={() => {
          changeSettings({
            ...settings,
            currentLang: "en",
          });
          localStorage.setItem("language", "en");
        }}
      >
        EN
      </Button>

      <Button
        className={currentLang === "ua" ? "lang-ua control-current" : "lang-ua"}
        onClick={() => {
          changeSettings({
            ...settings,
            currentLang: "ua",
          });
          localStorage.setItem("language", "ua");
        }}
      >
        UA
      </Button>

      <Button
        className={currentScale === "far" ? "scale-far control-current" : "scale-far"}
        onClick={() => {
          changeSettings({
            ...settings,
            currentScale: "far",
          });
          localStorage.setItem("scale", "far");
        }}
      >
        °F
      </Button>

      <Button
        className={currentScale === "cel" ? "scale-cel control-current" : "scale-cel"}
        onClick={() => {
          changeSettings({
            ...settings,
            currentScale: "cel",
          });
          localStorage.setItem("scale", "cel");
        }}
      >
        °C
      </Button>
    </div>
  );
};

export default ControlPanel;
