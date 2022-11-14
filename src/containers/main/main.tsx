import { FC } from "react";
import Weather from "../../components/weather";
import Map from "../../components/map";
import "./main.css";

const Main: FC = () => {
  return (
    <main className="main">
      <Weather />
      <Map />
    </main>
  );
};

export default Main;
