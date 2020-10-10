import React, { useContext } from "react";
import "./Main.css";
import Map from '../../components/Map/Map';
import Weather from '../../components/Weather/Weather';
import { MainContext } from "../../MainContext";
import BadRequest from '../../components/Warnings/BadRequest/BadRequest';
import BadMicrophone from "../../components/Warnings/BadMicrophone/BadMicrophone";
import BadGeo from "../../components/Warnings/BadGeo/BadGeo";

const Main = props => {
  const { request, isMicrophone, isGeo } = useContext(MainContext);

  return (
    <main className='Main'>
      {
        request ? <BadRequest /> : null
      }
      {
        isMicrophone ? <BadMicrophone /> : null
      }
      {
        isGeo ? <BadGeo /> : null
      }
      <Weather />
      <Map />
    </main>
  );
};

export default Main;
