import React from 'react';
import  './Header.css';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import SearchPanel from '../../components/SearchPanel/SearchPanel'
import changeShowLang from '../../scripts/changeShowLang';
import changeShowScale from '../../scripts/changeShowScale';
import VirtualKeyboard from '../../components/VirtualKeyboard/VirtualKeyboard';
import changeActiveLang from '../../scripts/changeActiveLang';
import changeActiveScale from '../../scripts/changeActiveScale';

const changeBackground = () => {
  const body = document.getElementsByTagName('body')[0];
  const unsplashUrl = 'https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&&query=';
  const unsplashKey = '&client_id=e_Ud2DTXMi01AovDee1hT-um5Qo2a7hdDmNmPxpk1W4';
  let image = new Image();
  fetch(`${unsplashUrl}${sessionStorage.getItem('photo')}${unsplashKey}`)
    .then(res => res.json())
    .then(res => {
      image.src = res.urls.regular;
      image.onload = () => {
        body.setAttribute('style', `background-image: url(${res.urls.regular})`);
      };
    })
};

const speakWeather = () => {
  let synth = window.speechSynthesis;
  let utterThis = new SpeechSynthesisUtterance(sessionStorage.getItem(`weather-${localStorage.getItem('language')}`));
  switch (localStorage.getItem('language')) {
    case 'ru':
      utterThis.lang = `ru-US`;
      break;
    case 'en':
      utterThis.lang = `en-US`;
      break;
    case 'be':
      utterThis.lang = `be-US`;
      break;
    default:
  };
  synth.speak(utterThis);
};

const ControlHandling = (event) => {
  const currentClick = event.target.textContent;
  switch (currentClick) {
    case ' ':
      speakWeather();
      break;
    case '':
      changeBackground();
      break;
    case 'RU':
      localStorage.setItem('language', 'ru');
      changeShowLang('ru');
      changeActiveLang('ru');
      break;
    case 'EN':
      localStorage.setItem('language', 'en');
      changeShowLang('en')
      changeActiveLang('en');
      break;
    case 'BE':
      localStorage.setItem('language', 'be');
      changeShowLang('be');
      changeActiveLang('be');
      break;
    case '°F':
      localStorage.setItem('scale', 'far');
      changeShowScale('far');
      changeActiveScale('far');
      break;
    case '°C':
      localStorage.setItem('scale', 'cel');
      changeShowScale('cel');
      changeActiveScale('cel');
      break;
    default:
      break;
  };
};

const Header = props => {
  return (
    <header className='Header' style={{display: 'flex'}}>
      <ControlPanel onClick={ControlHandling} />
      <SearchPanel />
      <VirtualKeyboard />
    </header>
  );
};

export default Header;