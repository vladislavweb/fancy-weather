import React from "react";
import  "./Main.css";
import Map from '../../components/Map/Map';
import Weather from '../../components/Weather/Weather';

const Main = props => {
  return (
    <main className='Main'>
      <Weather/>
      <Map/>
    </main>
  );
};

export default Main;
