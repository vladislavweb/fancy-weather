import React from 'react';
import classes from './Header.module.css';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import SearchPanel from '../../components/SearchPanel/SearchPanel'

const ChangeLanguage = () => {
  console.log('lang');
};

const ChangeScale = () => {
  console.log('scale');
};

const ControlHandling = (event) => {
  const currentClick = event.target.textContent;
  switch (currentClick) {
    case '':
      console.log('Смена картинки');
      break;
    case 'RU':
      ChangeLanguage();
      break;
    case 'EN':
      ChangeLanguage();
      break;
    case 'BE':
      ChangeLanguage();
      break;
    case '°F':
      ChangeScale();
      break;
    case '°C':
      ChangeScale();
      break;
    default:
      break;
  };
}

const Header = props => {
  return (
    <header className={classes.Header}>
      <ControlPanel
        onClick={ControlHandling}
      />
      <SearchPanel/>
    </header>
  );
};

export default Header;