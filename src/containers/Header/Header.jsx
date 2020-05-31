import React from 'react';
import  './Header.css';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import SearchPanel from '../../components/SearchPanel/SearchPanel'
import changeShowLang from '../../scripts/changeShowLang';
import changeShowScale from '../../scripts/changeShowScale';
import VirtualKeyboard from '../../components/VirtualKeyboard/VirtualKeyboard';

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

const ControlHandling = (event) => {
  const currentClick = event.target.textContent;
  switch (currentClick) {
    case '':
      changeBackground();
      break;
    case 'RU':
      localStorage.setItem('language', 'ru');
      changeShowLang('ru');
      break;
    case 'EN':
      localStorage.setItem('language', 'en');
      changeShowLang('en')
      break;
    case 'BE':
      localStorage.setItem('language', 'be');
      changeShowLang('be');
      break;
    case '°F':
      localStorage.setItem('scale', 'far');
      changeShowScale('far');
      break;
    case '°C':
      localStorage.setItem('scale', 'cel');
      changeShowScale('cel');
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