import React, { useState, useContext, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Mark from "./assets/MyLocation.svg";
import { MainContext } from "../../mainContext";
import { WeatherContext } from "../../providers/weather";
import "./map.css";

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

let isFound = true;
const geoReverse = "https://open.mapquestapi.com/geocoding/v1/reverse?key=";
const tokenMap =
  "pk.eyJ1IjoiaGltaW1ldHN1IiwiYSI6ImNrYWNtZ3VheDBuc3gyc284djVrOW50MnUifQ.CKQQ3zFcMaaQWHB-vZ8KLQ";
const tokenGeo = "BtHcuGO81EUArGaV164zvKD5sTuERK2O";
const urlGeo = "https://www.mapquestapi.com/geocoding/v1/address?key=";

const Map = (props: any) => {
  const { searchString, changeCity, changeGeo } = useContext(MainContext);
  const { updateMap, changeUpdateMap, settings } = useContext(WeatherContext);
  const currentLang = settings.currentLang;

  const [latCoord, setLatCoord] = useState<any>({
    gradus: 0,
    minutes: 0,
  });

  const [longCoord, setLongCoord] = useState<any>({
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
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetch(
            `${geoReverse}${tokenGeo}&location=${position.coords.latitude},${position.coords.longitude}`,
          )
            .then((data) => data.json())
            .then((data) => {
              changeCity(data.results[0].locations[0].adminArea5);
            });

          changeGeo(false);

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
            minutes: (
              (position.coords.latitude - Math.floor(position.coords.latitude)) *
              60
            ).toFixed(),
          });

          setLongCoord({
            gradus: position.coords.longitude.toFixed(),
            minutes: (
              (position.coords.longitude - Math.floor(position.coords.longitude)) *
              60
            ).toFixed(),
          });
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
        },
      );
      isFound = false;
    }
  });

  useEffect(() => {
    if (updateMap) {
      if (searchString.length > 1) {
        fetch(`${urlGeo}${tokenGeo}&location=${searchString}`)
          .then((data) => data.json())
          .then((data) => {
            if (data.results[0].locations.length > 0) {
              if (data.results[0].locations[0].adminArea5) {
                setLatCoord({
                  gradus: data.results[0].locations[0].latLng.lat.toFixed(),
                  minutes: (
                    (data.results[0].locations[0].latLng.lat -
                      Math.floor(data.results[0].locations[0].latLng.lat)) *
                    60
                  ).toFixed(),
                });

                setLongCoord({
                  gradus: data.results[0].locations[0].latLng.lng.toFixed(),
                  minutes: (
                    (data.results[0].locations[0].latLng.lng -
                      Math.floor(data.results[0].locations[0].latLng.lng)) *
                    60
                  ).toFixed(),
                });

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
              }
            }
          });
        changeUpdateMap(false);
      }
    }
  }, [updateMap]);

  return (
    <div className="Map-wrapper">
      <ReactMapGL
        {...map.viewport}
        // onViewportChange={(viewport: any) => setMap({ viewport })}
        // mapboxApiAccessToken={tokenMap}
        mapboxAccessToken={tokenMap}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          // mapboxApiAccessToken={tokenMap}
          longitude={point.longitude}
          latitude={point.latitude}
        >
          <img src={Mark} alt="Marker" height="40px" width="40px" />
        </Marker>
      </ReactMapGL>
      <div className="coordinates">
        <p className="long">{`${(mapDescription as any)[currentLang].long}: ${longCoord.gradus}° ${
          longCoord.minutes
        }' ${longCoord.gradus > 0 ? "E" : "W"}`}</p>
        <p className="lati">{`${(mapDescription as any)[currentLang].lati}: ${latCoord.gradus}° ${
          latCoord.minutes
        }' ${latCoord.gradus > 0 ? "N" : "S"}`}</p>
      </div>
    </div>
  );
};

export default Map;
