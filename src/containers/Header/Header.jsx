import React from 'react';
import  './Header.css';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import SearchPanel from '../../components/SearchPanel/SearchPanel'
import changeShowLang from '../../scripts/changeShowLang';
import changeShowScale from '../../scripts/changeShowScale';
import VirtualKeyboard from '../../components/VirtualKeyboard/VirtualKeyboard';

const ControlHandling = (event) => {
  const currentClick = event.target.textContent;
  switch (currentClick) {
    case '':
      console.log('Смена картинки');
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
      <ControlPanel
        onClick={ControlHandling}
      />
      <SearchPanel />
      <VirtualKeyboard />
    </header>
  );
};

export default Header;