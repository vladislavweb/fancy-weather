import { FC } from "react";
import { Map, Weather } from "components";
import "./main.scss";

const Main: FC = () => (
  <main className="main">
    <Weather />
    <Map />
  </main>
);

export default Main;
