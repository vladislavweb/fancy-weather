import { useState, useContext, useEffect, FC } from "react";
import { useIntl, defineMessages } from "react-intl";
import ReactMapGL, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import { ConfigContext, MapQuestContext } from "../../providers";
import { TypeRequest } from "../../types";

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
  const { mapBox } = useContext(ConfigContext);
  const { coordinates, changeMapQuestData, changeCoordinates } = useContext(MapQuestContext);
  const intl = useIntl();

  const [latCoord, setLatCoord] = useState({
    gradus: 0,
    minutes: 0,
  });

  const [longCoord, setLongCoord] = useState({
    gradus: 0,
    minutes: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        changeMapQuestData({
          typeRequest: TypeRequest.reverse,
          searchString: `${position.coords.latitude},${position.coords.longitude}`,
        });

        changeCoordinates({ lat: position.coords.latitude, long: position.coords.longitude });

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
    <div className="map-wrapper">
      <ReactMapGL
        zoom={11}
        longitude={coordinates?.long || 0}
        latitude={coordinates?.lat || 0}
        mapboxAccessToken={mapBox.token}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={{ height: "400px", width: "400px" }}
      >
        {coordinates && (
          <Marker longitude={coordinates?.long} latitude={coordinates?.lat}>
            <img src={Mark} alt="Marker" height="40px" width="40px" />
          </Marker>
        )}
      </ReactMapGL>

      <div className="coordinates">
        <p className="long">
          {intl.formatMessage(messages.componentsMapLongitude, {
            gradus: longCoord.gradus,
            minutes: longCoord.minutes,
            type: longCoord.gradus > 0 ? "E" : "W",
          })}
        </p>

        <p className="lat">
          {intl.formatMessage(messages.componentsMapLatitude, {
            gradus: latCoord.gradus,
            minutes: latCoord.minutes,
            type: latCoord.gradus > 0 ? "N" : "S",
          })}
        </p>
      </div>
    </div>
  );
};

export default Map;
