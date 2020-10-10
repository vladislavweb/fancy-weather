import React from 'react';
import { useContext } from 'react';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import SearchPanel from '../../components/SearchPanel/SearchPanel'
import VirtualKeyboard from '../../components/VirtualKeyboard/VirtualKeyboard';
import { WeatherContext } from '../../Context/WeatherContext';
import './Header.css';

const Header = () => {
  const { showVirtualKeyboard } = useContext(WeatherContext)

  return (
    <header className='Header'>
      <ControlPanel />
      <SearchPanel />
      {showVirtualKeyboard && <VirtualKeyboard />}
    </header>
  );
};

export default Header;