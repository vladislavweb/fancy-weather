import { useState, useContext, useEffect, FC } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { ConfigContext, SettingsContext } from "../../providers";
import { MapQuestContext } from "../../providers/mapQuest";
import { TypeRequest } from "../../types";

import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css";

import Mark from "./assets/MyLocation.svg";

const mapDescription = {
  ru: {
    lati: "Широта",
    long: "Долгота",
  },
  en: {
    lati: "Latitude",
    long: "Longitude",
  },
  ua: {
    lati: "Широта",
    long: "Довгота",
  },
};

const Map: FC = () => {
  const { mapBox } = useContext(ConfigContext);
  const { changeMapQuestData, changeCoordinates } = useContext(MapQuestContext);
  const { language } = useContext(SettingsContext);

  const [latCoord, setLatCoord] = useState({
    gradus: 0,
    minutes: 0,
  });

  const [longCoord, setLongCoord] = useState({
    gradus: 0,
    minutes: 0,
  });

  const [map, setMap] = useState({
    viewport: {
      width: "400px",
      height: "400px",
      latitude: 0,
      longitude: 0,
      zoom: 11,
    },
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        changeMapQuestData({
          typeRequest: TypeRequest.reverse,
          address: "",
          searchString: `${position.coords.latitude},${position.coords.longitude}`,
        });

        changeCoordinates({ lat: position.coords.latitude, long: position.coords.longitude });

        setMap({
          viewport: {
            width: "400px",
            height: "400px",
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 11,
          },
        });

        setLatCoord({
          gradus: Number(position.coords.latitude.toFixed()),
          minutes: Number(
            ((position.coords.latitude - Math.floor(position.coords.latitude)) * 60).toFixed(),
          ),
        });

        setLongCoord({
          gradus: Number(position.coords.longitude.toFixed()),
          minutes: Number(
            ((position.coords.longitude - Math.floor(position.coords.longitude)) * 60).toFixed(),
          ),
        });
      },
      (error) => {
        console.error(`Navigation Geolocation: ${error.code}, ${error.message}`);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, []);

  return (
    <div className="Map-wrapper">
      <ReactMapGL
        {...map.viewport}
        mapboxAccessToken={mapBox.token}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={{ height: "400px", width: "400px" }}
      >
        <Marker longitude={map.viewport.longitude} latitude={map.viewport.latitude}>
          <img src={Mark} alt="Marker" height="40px" width="40px" />
        </Marker>
      </ReactMapGL>

      <div className="coordinates">
        <p className="long">{`${(mapDescription as any)[language].long}: ${longCoord.gradus}° ${
          longCoord.minutes
        }' ${longCoord.gradus > 0 ? "E" : "W"}`}</p>

        <p className="lati">{`${(mapDescription as any)[language].lati}: ${latCoord.gradus}° ${
          latCoord.minutes
        }' ${latCoord.gradus > 0 ? "N" : "S"}`}</p>
      </div>
    </div>
  );
};

export default Map;
