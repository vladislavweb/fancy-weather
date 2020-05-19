import React from "react";
import classes from "./Main.module.css";
import Map from '../../components/Map/Map';
import Weather from '../../components/Weather/Weather';

const Main = props => {
  return (
    <main className={classes.Main}>
      <Weather/>
      <Map/>
    </main>
  );
};

export default Main;
