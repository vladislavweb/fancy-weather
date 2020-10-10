import React, { useContext } from "react";
import Map from '../../components/Map/Map';
import Weather from '../../components/Weather/Weather';
import { MainContext } from "../../MainContext";
import BadRequest from '../../components/Warnings/BadRequest/BadRequest';
import BadMicrophone from "../../components/Warnings/BadMicrophone/BadMicrophone";
import BadGeo from "../../components/Warnings/BadGeo/BadGeo";
import { WeatherContext } from "../../Context/WeatherContext";
import "./Main.css";

const Main = () => {
  const { request, isMicrophone, isGeo } = useContext(MainContext);
  const { currentLang } = useContext(WeatherContext);

  return (
    <main className='Main'>
      {request && <BadRequest lang={currentLang} />}
      {isMicrophone && <BadMicrophone lang={currentLang} />}
      {isGeo && <BadGeo lang={currentLang} />}
      <Weather />
      <Map />
    </main>
  );
};

export default Main;
