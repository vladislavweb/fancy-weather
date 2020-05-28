import React, { useState, useContext, useEffect } from 'react';
import './Map.css';
import ReactMapGL, { Marker } from "react-map-gl";
import Mark from './assets/MyLocation.svg';
import { MainContext } from '../../MainContext';

let isFound = true;
let grad = 0;
let min = 0;
let sec = 0;
const urlMap = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const tokenMap = 'pk.eyJ1IjoiaGltaW1ldHN1IiwiYSI6ImNrYWNtZ3VheDBuc3gyc284djVrOW50MnUifQ.CKQQ3zFcMaaQWHB-vZ8KLQ';
const tokenGeo = 'BtHcuGO81EUArGaV164zvKD5sTuERK2O'
const urlGeo = 'https://www.mapquestapi.com/geocoding/v1/address?key='

const Map = props => {
  const { searchString, changeSearchString } = useContext(MainContext);

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

  const [point, setPoint] = useState({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    if (isFound) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.longitude);
        console.log(Math.floor(position.coords.longitude));
        
        
        setMap({
          viewport: {
            width: "400px",
            height: "400px",
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 11,
          },
        });

        setPoint({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLatCoord({
          gradus: position.coords.latitude.toFixed(),
          minutes: ((position.coords.latitude - Math.floor(position.coords.latitude)) * 60).toFixed(),
        });

        setLongCoord({
          gradus: position.coords.longitude.toFixed(),
          minutes: ((position.coords.longitude - Math.floor(position.coords.longitude)) * 60).toFixed(),
        });
      });
      isFound = false;
    };
  });

  useEffect(() => {
    if (searchString) {
      if (searchString.length > 3) {
        fetch(`${urlGeo}${tokenGeo}&location=${searchString}`)
          .then(data => data.json())
          .then((data) => {
            setMap({
              viewport: {
                width: "400px",
                height: "400px",
                latitude: data.results[0].locations[0].latLng.lat,
                longitude: data.results[0].locations[0].latLng.lng,
                zoom: 11,
              },
            });
            setPoint({
              latitude: data.results[0].locations[0].latLng.lat,
              longitude: data.results[0].locations[0].latLng.lng,
            });

            changeSearchString('');
          })
      };
    };
  });


  return (
    <div className="Map-wrapper">
      <ReactMapGL
        {...map.viewport}
        onViewportChange={(viewport) => setMap({ viewport })}
        mapboxApiAccessToken={tokenMap}
        mapStyle="mapbox://styles/mapbox/streets-v11">
        <Marker
          mapboxApiAccessToken={tokenMap}
          longitude={point.longitude}
          latitude={point.latitude}>
          <img src={Mark} alt="Marker" height="40px" width="40px" />
        </Marker>
      </ReactMapGL>
      <div className='coordinates'>
        <span className='ru'>
          <p className='long'>Долгота: {longCoord.gradus}° {longCoord.minutes}'</p>
          <p className='lati'>Широта: {latCoord.gradus}° {latCoord.minutes}'</p>
        </span>
        <span className='en'>
          <p className='long'>Longitude: {longCoord.gradus}° {longCoord.minutes}'</p>
          <p className='lati'>Latitude: {latCoord.gradus}° {latCoord.minutes}'</p>
        </span>
        <span className='be'>
          <p className='long'>Шырата: {longCoord.gradus}° {longCoord.minutes}'</p>
          <p className='lati'>Даўгата: {latCoord.gradus}° {latCoord.minutes}'</p>
        </span>
      </div>
    </div>
  );
};

export default Map;
