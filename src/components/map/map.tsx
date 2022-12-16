import { useState, useContext, useEffect, FC } from "react";
import { useIntl, defineMessages } from "react-intl";
import ReactMapGL, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import { throttle } from "lodash";
import { DataContext } from "../../providers";
import { TypeFetchData } from "../../api";

import config from "../../application.json";

import "./map.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import Mark from "./assets/my-location.svg";

// @ts-ignore
// eslint-disable-next-line
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const messages = defineMessages({
  componentsMapLongitude: {
    id: "componentsMapLongitude",
    defaultMessage: "Longitude: {gradus}° {minutes} {type}",
  },
  componentsMapLatitude: {
    id: "componentsMapLatitude",
    defaultMessage: "Latitude: {gradus}° {minutes} {type}",
  },
});

const Map: FC = () => {
  const [mapSize, setMapSize] = useState(window.screen.width <= 760 ? 300 : 400);
  const { data, getData } = useContext(DataContext);
  const intl = useIntl();

  const [latCoord, setLatCoord] = useState({
    gradus: 0,
    minutes: 0,
  });

  const [longCoord, setLongCoord] = useState({
    gradus: 0,
    minutes: 0,
  });

  const updateMapSize = throttle(() => {
    if (window.screen.width <= 760) {
      setMapSize(300);
    } else {
      setMapSize(400);
    }
  }, 1000);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getData({
          type: TypeFetchData.COORDINATES,
          coordinates: {
            lat: position.coords.latitude,
            long: position.coords.longitude,
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

  useEffect(() => {
    window.addEventListener("resize", updateMapSize);

    return () => {
      window.removeEventListener("resize", updateMapSize);
    };
  }, []);

  return (
    <div className="map">
      <ReactMapGL
        zoom={11}
        longitude={data?.coordinates?.long || 0}
        latitude={data?.coordinates?.lat || 0}
        mapboxAccessToken={config.mapBox.token}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={{ height: mapSize, width: mapSize }}
      >
        {data?.coordinates && (
          <Marker longitude={data?.coordinates?.long} latitude={data?.coordinates?.lat}>
            <img src={Mark} alt="Marker" height="40px" width="40px" />
          </Marker>
        )}
      </ReactMapGL>

      <div className="map__coordinates">
        <p className="map__long">
          <span>
            {intl.formatMessage(messages.componentsMapLongitude, {
              gradus: longCoord.gradus,
              minutes: longCoord.minutes,
              type: longCoord.gradus > 0 ? "E" : "W",
            })}
          </span>
        </p>

        <p className="map__lat">
          <span>
            {intl.formatMessage(messages.componentsMapLatitude, {
              gradus: latCoord.gradus,
              minutes: latCoord.minutes,
              type: latCoord.gradus > 0 ? "N" : "S",
            })}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Map;
