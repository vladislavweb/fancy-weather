import React, { useContext } from "react";
import Map from "../../components/map";
import Weather from "../../components/weather";
import { MainContext } from "../../mainContext";
import { WeatherContext } from "../../providers/weather";
import "./main.css";

const Main = () => {
  const { request, isMicrophone, isGeo } = useContext(MainContext);
  const { settings } = useContext(WeatherContext);
  const { currentLang } = settings;

  return (
    <main className="main">
      <Weather />
      <Map />
    </main>
  );
};

export default Main;
