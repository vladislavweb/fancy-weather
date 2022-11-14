import Weather from "../../components/weather";
import Map from "../../components/map";
import "./main.css";

const Main = () => {
  return (
    <main className="main">
      <Weather />
      <Map />
    </main>
  );
};

export default Main;
