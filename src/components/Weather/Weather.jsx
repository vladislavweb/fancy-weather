import React, { useState, useEffect, useContext } from 'react';
import './Weather.css';
import ThreeDays from './ThreeDays/ThreeDays';
import { MainContext } from '../../MainContext';
import Today from './Today/Today';
import Loader from '../UI/Loader/Loader';

let isFound = true;
let lat = 0;
let long = 0;
const link = 'https://api.openweathermap.org/data/2.5/forecast?';
const keyWeather = 'eac54b3672659f3dd10f71d884f30279';
const tokenMap = 'pk.eyJ1IjoiaGltaW1ldHN1IiwiYSI6ImNrYWNtZ3VheDBuc3gyc284djVrOW50MnUifQ.CKQQ3zFcMaaQWHB-vZ8KLQ';
const tokenGeo = 'BtHcuGO81EUArGaV164zvKD5sTuERK2O'
const urlGeo = 'https://www.mapquestapi.com/geocoding/v1/address?key='
const geoReverse = 'https://open.mapquestapi.com/geocoding/v1/reverse?key=';
const unsplashUrl = 'https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&&query=';
const unsplashKey = '&client_id=e_Ud2DTXMi01AovDee1hT-um5Qo2a7hdDmNmPxpk1W4';
const body = document.getElementsByTagName('body')[0];

const Weather = props => {
  const nowToday = (day, weath) => {
    if (day === 'n') {
      switch (weath) {
        case '01':
          setImgNow('csn');
          break;
        case '02':
          setImgNow('fcn');
          break;
        case '03':
          setImgNow('scn');
          break;
        case '04':
          setImgNow('bcn');
          break;
        case '09':
          setImgNow('sr');
          break;
        case '10':
          setImgNow('rn');
          break;
        case '11':
          setImgNow('thunderstorm');
          break;
        case '13':
          setImgNow('sn');
          break;
        case '50':
          setImgNow('mist');
          break;
        default:
      }
    } else if (day === 'd') {
      switch (weath) {
        case '01':
          setImgNow('csd');
          break;
        case '02':
          setImgNow('fcd');
          break;
        case '03':
          setImgNow('scd');
          break;
        case '04':
          setImgNow('bcd');
          break;
        case '09':
          setImgNow('sr');
          break;
        case '10':
          setImgNow('rd');
          break;
        case '11':
          setImgNow('thunderstorm');
          break;
        case '13':
          setImgNow('sd');
          break;
        case '50':
          setImgNow('mist');
          break;
        default:
      }
    }
  }

  const [timeZone, setTimeZone] = useState(0);
  const [speakEn, setSpeakEn] = useState('');
  const { searchString, changeSearchString, changeRequest } = useContext(MainContext);
  const { city, changeCity } = useContext(MainContext);
  const [country, setCountry] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [imgNow, setImgNow] = useState('');
  const [weatherNow, setWeatherNow] = useState({
    lang: localStorage.getItem('language'),
    weather: '-',
    speed: 0,
    humidity: 0,
    feel: 0,
    temp: 0,
  });

  const [weatherThree, setWeatherThree] = useState([
    {
      avgTemp: 0,
      day: '',
      img: '',
      weather: '',
    },
    {
      avgTemp: 0,
      day: '',
      img: '',
      weather: '',
    },
    {
      avgTemp: 0,
      day: '',
      img: '',
      weather: '',
    },
  ]);

  useEffect(() => {
    if (isFound) {
      navigator.geolocation.getCurrentPosition((position) => {
        changeRequest(false);
        lat = position.coords.latitude;
        long = position.coords.longitude;

        fetch(`${geoReverse}${tokenGeo}&location=${lat},${long}`)
          .then(data => data.json())
          .then((data) => {
            changeCity(data.results[0].locations[0].adminArea5)
          })

        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?types=country&access_token=${tokenMap}`)
          .then(res => res.json())
          .then(res => {
            setCountry(res.features[0].place_name);
          })

        fetch(`${link}lat=${lat}&lon=${long}&appid=${keyWeather}&lang=en&cnt=32&units=metric`)
          .then(res => res.json())
          .then(res => {
            let image = new Image();

            if (res.list[0].sys.pod === 'n') {
              sessionStorage.setItem('photo', `nigth ${res.list[0].weather[0].main}`);
              fetch(`${unsplashUrl}nigth ${res.list[0].weather[0].main}${unsplashKey}`)
                .then(res => res.json())
                .then(res => {
                  image.src = res.urls.regular;
                  image.onload = () => {
                    body.setAttribute('style', `background-image: url(${res.urls.regular})`);
                  };
                })
            } else if (res.list[0].sys.pod === 'd') {
              sessionStorage.setItem('photo', `day ${res.list[0].weather[0].main}`);
              fetch(`${unsplashUrl}day ${res.list[0].weather[0].main}${unsplashKey}`)
                .then(res => res.json())
                .then(res => {
                  image.src = res.urls.regular;
                  image.onload = () => {
                    body.setAttribute('style', `background-image: url(${res.urls.regular})`);
                  };
                })
            };

            nowToday(res.list[0].weather[0].icon.charAt(2), res.list[0].weather[0].icon.substring(0, 2))

            setSpeakEn(`Weather today: ${res.list[0].weather[0].description}, wind speed ${res.list[0].wind.speed.toFixed(1)} meter per second, humidity ${res.list[0].main.humidity} percent, the temperature feels like ${res.list[0].main.feels_like.toFixed()} degrees.`)

            sessionStorage.setItem('weather-en', `Weather today: ${res.list[0].weather[0].description}, wind speed ${res.list[0].wind.speed.toFixed(1)} meter per second, humidity ${res.list[0].main.humidity} percent, the temperature feels like ${res.list[0].main.feels_like.toFixed()} degrees.`)

            setWeatherNow({
              lang: localStorage.getItem('language'),
              weather: res.list[0].weather[0].description,
              speed: res.list[0].wind.speed,
              humidity: res.list[0].main.humidity,
              feel: res.list[0].main.feels_like,
              temp: res.list[0].main.temp,
            });

            setIsDataLoaded(true);

            setWeatherThree([
              {
                avgTemp: (res.list[8].main.temp_max + res.list[8].main.temp_min) / 2,
                day: res.list[8].weather[0].icon.charAt(2),
                img: res.list[8].weather[0].icon.substring(0, 2),
                weather: res.list[8].weather[0].description,
              },
              {
                avgTemp: (res.list[16].main.temp_max + res.list[16].main.temp_min) / 2,
                day: res.list[16].weather[0].icon.charAt(2),
                img: res.list[16].weather[0].icon.substring(0, 2),
                weather: res.list[16].weather[0].description,
              },
              {
                avgTemp: (res.list[24].main.temp_max + res.list[24].main.temp_min) / 2,
                day: res.list[24].weather[0].icon.charAt(2),
                img: res.list[24].weather[0].icon.substring(0, 2),
                weather: res.list[24].weather[0].description,
              },
            ]);
          });
      });
      isFound = false;
    };
  });

  useEffect(
    () => {
      fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${sessionStorage.getItem('weather-en')}&lang=en-ru`)
        .then((res) => res.json())
        .then((data) => {
          sessionStorage.setItem('weather-ru', data.text[0])
        });

      fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${sessionStorage.getItem('weather-en')}&lang=en-be`)
        .then((res) => res.json())
        .then((data) => {
          sessionStorage.setItem('weather-be', data.text[0])
        });
    },
    [speakEn]
  );

  useEffect(() => {
    if (searchString) {
      localStorage.setItem('isRequest', true);
      fetch(`${urlGeo}${tokenGeo}&location=${searchString}`)
        .then(data => data.json())
        .then((data) => {
          if (data.results[0].locations.length > 0) {
            if (data.results[0].locations[0].adminArea5.length > 0) {
              changeRequest(false);
              lat = data.results[0].locations[0].latLng.lat;
              long = data.results[0].locations[0].latLng.lng;

              fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?types=country&access_token=${tokenMap}`)
                .then(res => res.json())
                .then(res => {
                  setCountry(res.features[0].place_name);
                })

              fetch(`${urlGeo}${tokenGeo}&location=${searchString}`)
                .then(data => data.json())
                .then((data) => {
                  changeCity(data.results[0].locations[0].adminArea5)
                })

              fetch(`${link}lat=${lat}&lon=${long}&appid=${keyWeather}&lang=en&cnt=32&units=metric`)
                .then(res => res.json())
                .then(res => {
                  let image = new Image();
                  if (res.list[0].sys.pod === 'n') {
                    sessionStorage.setItem('photo', `nigth ${res.list[0].weather[0].main}`);
                    fetch(`${unsplashUrl}nigth ${res.list[0].weather[0].main}${unsplashKey}`)
                      .then(res => res.json())
                      .then(res => {
                        image.src = res.urls.regular;
                        image.onload = () => {
                          body.setAttribute('style', `background-image: url(${res.urls.regular})`);
                        };
                      })
                  } else if (res.list[0].sys.pod === 'd') {
                    sessionStorage.setItem('photo', `day ${res.list[0].weather[0].main}`);
                    fetch(`${unsplashUrl}day ${res.list[0].weather[0].main}${unsplashKey}`)
                      .then(res => res.json())
                      .then(res => {
                        image.src = res.urls.regular;
                        image.onload = () => {
                          body.setAttribute('style', `background-image: url(${res.urls.regular})`);
                        };
                      })
                  };

                  // document.getElementsByClassName('old')[0].classList.add('hidden')
                  // document.getElementsByClassName('new')[0].classList.remove('hidden')

                  setTimeZone(res.city.timezone)

                  if (res.list[0].weather[0].icon.split('').includes('n')) {
                    nowToday('n', res.list[0].weather[0].icon.substring(0, 2))
                  } else if (res.list[0].weather[0].icon.split('').includes('d')) {
                    nowToday('d', res.list[0].weather[0].icon.substring(0, 2))
                  }

                  setSpeakEn(`Weather today: ${res.list[0].weather[0].description}, wind speed ${res.list[0].wind.speed.toFixed(1)} meter per second, humidity ${res.list[0].main.humidity} percent, the temperature feels like ${res.list[0].main.feels_like.toFixed()} degrees.`)

                  sessionStorage.setItem('weather-en', `Weather today: ${res.list[0].weather[0].description}, wind speed ${res.list[0].wind.speed.toFixed(1)} meter per second, humidity ${res.list[0].main.humidity} percent, the temperature feels like ${res.list[0].main.feels_like.toFixed()} degrees.`)

                  setWeatherNow({
                    lang: localStorage.getItem('language'),
                    weather: res.list[0].weather[0].description,
                    speed: res.list[0].wind.speed,
                    humidity: res.list[0].main.humidity,
                    feel: res.list[0].main.feels_like,
                    temp: res.list[0].main.temp,
                    img: res.list[0].weather[0].icon,
                  });

                  setWeatherThree([
                    {
                      avgTemp: (res.list[8].main.temp_max + res.list[8].main.temp_min) / 2,
                      day: res.list[8].weather[0].icon.charAt(2),
                      img: res.list[8].weather[0].icon.substring(0, 2),
                      weather: res.list[8].weather[0].description,
                    },
                    {
                      avgTemp: (res.list[16].main.temp_max + res.list[16].main.temp_min) / 2,
                      day: res.list[16].weather[0].icon.charAt(2),
                      img: res.list[16].weather[0].icon.substring(0, 2),
                      weather: res.list[16].weather[0].description,
                    },
                    {
                      avgTemp: (res.list[24].main.temp_max + res.list[24].main.temp_min) / 2,
                      day: res.list[24].weather[0].icon.charAt(2),
                      img: res.list[24].weather[0].icon.substring(0, 2),
                      weather: res.list[24].weather[0].description,
                    },
                  ]);
                })
              changeSearchString('');
            } else {
              changeRequest(true);
            }
          }
          })
    };
  });

  return (
    <div className='Weather'>
      {
        isDataLoaded && <Today {...weatherNow} country={country} imgNow={imgNow} city={city} timeZone={timeZone}/>
      }
      {
        !isDataLoaded ? <Loader/> : null
      }
      <ThreeDays weatherThree={weatherThree} />
    </div>
  );
};

export default Weather;
