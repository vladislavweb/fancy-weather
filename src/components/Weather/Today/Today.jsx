import React, { useState, useEffect } from 'react';
import  './Today.css';
import changeShowLang from '../../../scripts/changeShowLang';
import changeShowScale from '../../../scripts/changeShowScale';
import data from '../../../assets/data';

let block = true

const Today = props => {
  console.log('render today');

  const [ruCity, setRuCity] = useState('');
  const [ruWeather, setRuWeather] = useState('');
  const [beCity, setBeCity] = useState('');
  const [beWeather, setBeWeather] = useState('');
  const [ruCountry, setRuCountry] = useState('');
  const [beCountry, setBeCountry] = useState('');
  const [time, setTime] = useState({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
  });

  useEffect(
    () => {
      if (props.country.length > 1) {
        fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${props.country}&lang=en-ru`)
          .then((res) => res.json())
          .then((data) => {
            setRuCountry(data.text[0]);
          });

        fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${props.country}&lang=en-be`)
          .then((res) => res.json())
          .then((data) => {
            setBeCountry(data.text[0]);
          });

        fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${props.city}&lang=en-ru`)
          .then((res) => res.json())
          .then((data) => {
            setRuCity(data.text[0]);
          });

        fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${props.city}&lang=en-be`)
          .then((res) => res.json())
          .then((data) => {
            setBeCity(data.text[0]);
          });

        fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${props.weather}&lang=en-ru`)
          .then((res) => res.json())
          .then((data) => {
            setRuWeather(data.text[0]);
          });

        fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${props.weather}&lang=en-be`)
          .then((res) => res.json())
          .then((data) => {
            setBeWeather(data.text[0]);
          });
      }
    },
    [props.city]
  )

  useEffect(
    () => {
      changeShowScale(localStorage.getItem('scale'));
      changeShowLang(localStorage.getItem('language'));
    },
    []
  );

  // setTimeout(() => {
  //   setTime(
  //     {
  //       hours: new Date().getHours(),
  //       minutes: new Date().getMinutes(),
  //       seconds: new Date().getSeconds(),
  //     },
  //   );
  // }, 1000);

  useEffect(
    () => {
      const timeout = setTimeout(() => {
        setTime(
          {
            hours: new Date().getHours(),
            minutes: new Date().getMinutes(),
            seconds: new Date().getSeconds(),
          },
        );

        return () => clearTimeout(timeout)
      }, 1000);
    },
    [time]
  )

  return (
    <div className='today'>
      <div className='location'>
        <span className='ru'>
          <p className='city'>
            {ruCity}
          </p>
          <p className='country'>
            {ruCountry}
          </p>
        </span>
        <span className='en'>
          <p className='city'>
            {props.city}
          </p>
          <p className='country'>
            {props.country}
          </p>
        </span>
        <span className='be'>
          <p className='city'>
            {beCity}
          </p>
          <p className='country'>
            {beCountry}
          </p>
        </span>
      </div>

      <div className='date'>
        <span className='ru'>
          {data.days.ru[new Date().getDay()]} &nbsp;
          {data.months.ru[new Date().getMonth()]} &nbsp;
          {new Date().getDate()} &nbsp;
          {new Date().getFullYear()}
        </span>
        <span className='en'>
          {data.days.en[new Date().getDay()]} &nbsp;
          {data.months.en[new Date().getMonth()]} &nbsp;
          {new Date().getDate()} &nbsp;
          {new Date().getFullYear()}
        </span>
        <span className='be'>
          {data.days.be[new Date().getDay()]} &nbsp;
          {data.months.be[new Date().getMonth()]} &nbsp;
          {new Date().getDate()} &nbsp;
          {new Date().getFullYear()}
        </span>
      </div>

      <div className='time'>
        {time.hours}:{time.minutes}:{time.seconds}
      </div>

      <div className='about'>
        <div className='about-weather'>
          <span className='ru'>
            {ruWeather}
          </span>
          <span className='en'>
            {props.weather}
          </span>
          <span className='be'>
            {beWeather}
          </span>
        </div>
        <div className={`aboutIcon ${props.imgNow}`}>
        </div>
      </div>

      <div className='parameters'>
        <div className='temperature'>
          <div className='cel'>
            <span>
              {(props.temp / 1).toFixed()}
            </span>
            <span>
              °C
            </span>
          </div>
          <div className='far'>
            <span>
              {(props.temp * 1.8 + 32).toFixed().toString()}
            </span>
            <span>
              °F
            </span>
          </div>
        </div>

        <div className='details'>
          <div className='speed'>
            <span className='ru'>
              Скорость ветра: {props.speed}м/с
            </span>
            <span className='en'>
              Wind speed: {props.speed}mph
            </span>
            <span className='be'>
              Хуткасць ветру: {props.speed}м/с
            </span>
          </div>

          <div className='feel'>
            <span className='ru'>
              <span className='cel'>
                Ощущается как: {(props.feel / 1).toFixed()} °C
              </span>
              <span className='far'>
                Ощущается как: {(props.feel / 1 * 1.8 + 32).toFixed()} °F
              </span>
            </span>
            <span className='en'>
              <span className='cel'>
                Feels like: {(props.feel / 1).toFixed()} °C
              </span>
              <span className='far'>
                Feels like: {(props.feel / 1 * 1.8 + 32).toFixed()} °F
              </span>
            </span>
            <span className='be'>
              <span className='cel'>
                Адчуваецца як: {(props.feel / 1).toFixed()} °C
              </span>
              <span className='far'>
                Адчуваецца як: {(props.feel / 1 * 1.8 + 32).toFixed()} °F
              </span>
            </span>
          </div>

          <div className='humidity'>
            <span className='ru'>
              Влажность: {props.humidity}%
            </span>
            <span className='en'>
              Humidity: {props.humidity}%
            </span>
            <span className='be'>
              Вільготнасць: {props.humidity}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;



// useEffect(
//   () => {
//     fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${props.city}&lang=en-ru`)
//       .then((res) => res.json())
//       .then((data) => {
//         setRuCity(data.text[0]);
//       });

//     fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${props.city}&lang=en-be`)
//       .then((res) => res.json())
//       .then((data) => {
//         setBeCity(data.text[0]);
//       });

//     fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${props.weather}&lang=en-ru`)
//       .then((res) => res.json())
//       .then((data) => {
//         setRuWeather(data.text[0]);
//       });

//     fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T183210Z.a1be0af551638071.2c5c96f21e02eb3e9e57602385a8ec468ffcb181&text=${props.weather}&lang=en-be`)
//       .then((res) => res.json())
//       .then((data) => {
//         setBeWeather(data.text[0]);
//       });
//   },
//   [props.city, props.weather]
// );