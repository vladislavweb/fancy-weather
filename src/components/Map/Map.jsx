import React, { useState, useContext } from 'react';
import './Map.css';
import ReactMapGL, { Marker } from "react-map-gl";
import Mark from './assets/MyLocation.svg';
import { MainContext } from '../../MainContext';

const Map = props => {
  const { searchString } = useContext(MainContext);

  const [map, setMap] = useState({
    viewport: {
      width: "400px",
      height: "400px",
      latitude: 0,
      longitude: 0,
      zoom: 10,
    },
  });

  const [point, setPoint] = useState({
    longitude: 0,
    latitude: 0,
  });

  navigator.geolocation.getCurrentPosition((position) => {
    setMap({
      viewport: {
        width: "400px",
        height: "400px",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 10,
      },
    });

    setPoint({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });

  return (
    <div className="Map-wrapper" id="Map">
      <div>{searchString}</div>
      <ReactMapGL
        {...map.viewport}
        onViewportChange={(viewport) => setMap({ viewport })}
        mapboxApiAccessToken="pk.eyJ1IjoiaGltaW1ldHN1IiwiYSI6ImNrYWNtZ3VheDBuc3gyc284djVrOW50MnUifQ.CKQQ3zFcMaaQWHB-vZ8KLQ"
        mapStyle="mapbox://styles/mapbox/streets-v11">
        <Marker
          mapboxApiAccessToken="pk.eyJ1IjoiaGltaW1ldHN1IiwiYSI6ImNrYWNtZ3VheDBuc3gyc284djVrOW50MnUifQ.CKQQ3zFcMaaQWHB-vZ8KLQ"
          longitude={point.longitude}
          latitude={point.latitude}>
          <img src={Mark} alt="Marker" height="40px" width="40px" />
        </Marker>
      </ReactMapGL>
      <div>
        <p>latitude: {map.viewport.latitude}</p>
        <p>longitude: {map.viewport.longitude}</p>
      </div>
    </div>
  );
};

export default Map;
