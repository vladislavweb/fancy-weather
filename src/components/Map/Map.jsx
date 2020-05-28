import React, { useState, useContext, useEffect } from 'react';
import './Map.css';
import ReactMapGL, { Marker } from "react-map-gl";
import Mark from './assets/MyLocation.svg';
import { MainContext } from '../../MainContext';

// http://open.mapquestapi.com/geocoding/v1/reverse?key=KEY&location=30.333472,-81.470448&includeRoadMetadata=true&includeNearestIntersection=true

const geoReverse = 'https://open.mapquestapi.com/geocoding/v1/reverse?key=';
let isFound = true;
const tokenMap = 'pk.eyJ1IjoiaGltaW1ldHN1IiwiYSI6ImNrYWNtZ3VheDBuc3gyc284djVrOW50MnUifQ.CKQQ3zFcMaaQWHB-vZ8KLQ';
const tokenGeo = 'BtHcuGO81EUArGaV164zvKD5sTuERK2O'
const urlGeo = 'https://www.mapquestapi.com/geocoding/v1/address?key='

const Map = props => {
  const { searchString, changeSearchString } = useContext(MainContext);

  const { changeCity } = useContext(MainContext);

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
        fetch(`${geoReverse}${tokenGeo}&location=${position.coords.latitude},${position.coords.longitude}`)
          .then(data => data.json())
          .then((data) => {
            changeCity(data.results[0].locations[0].adminArea5)
            sessionStorage.setItem('location', data.results[0].locations[0].adminArea5)
          })

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
        }, error => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
        }
      )
      isFound = false;
    };
  });

  useEffect(() => {
    if (searchString) {
      if (searchString.length > 1) {
        fetch(`${urlGeo}${tokenGeo}&location=${searchString}`)
          .then(data => data.json())
          .then((data) => {
            sessionStorage.setItem('location', data.results[0].locations[0].adminArea5)
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
          })
      };
    };
  }, [searchString]);

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
