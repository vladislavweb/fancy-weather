import React, { useState, useContext, useEffect } from 'react';
import './Map.css';
import ReactMapGL, { Marker } from "react-map-gl";
import Mark from './assets/MyLocation.svg';
import { MainContext } from '../../MainContext';

let isFound = true;

const Map = props => {
  const { searchString, changeSearchString } = useContext(MainContext);

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

  useEffect(() => {
    if (isFound) {
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
      isFound = false;
    }
  })

  useEffect(() => {
    if (searchString) {
      if (searchString.length > 3) {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchString}.json?access_token=pk.eyJ1IjoiaGltaW1ldHN1IiwiYSI6ImNrYWNtZ3VheDBuc3gyc284djVrOW50MnUifQ.CKQQ3zFcMaaQWHB-vZ8KLQ`)
          .then(res => res.json())
          .then(
            (result) => {
              if (result.features.length > 0) {
                setMap({
                  viewport: {
                    width: "400px",
                    height: "400px",
                    latitude: result.features[0].center[1],
                    longitude: result.features[0].center[0],
                    zoom: 10,
                  },
                });
                setPoint({
                  latitude: result.features[0].center[1],
                  longitude: result.features[0].center[0],
                })
                changeSearchString('');
              }
            }
          )
      }
    }
  });


  return (
    <div className="Map-wrapper">
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
