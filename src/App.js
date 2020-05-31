import React, { useState } from 'react';
import Layout from './hoc/Layout/Layout';
import Header from './containers/Header/Header'
import Footer from './containers/Footer/Footer';
import Main from './containers/Main/Main';
import { MainContext } from './MainContext';
import WeatherApi from './Context/WeatherContext/WeatherApi';

const App = () => {
  const [city, setCity] = useState('Loading...');
  const [searchString, setSearchString] = useState('');
  const [theme, setTheme] = useState('black');
  const [isGeo, setIsGeo] = useState(true);
  const [isMicrophone, setIsMicrophone] = useState(true);
  const [request, setRequest] = useState(false);

  const changeTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  };

  const changeRequest = value => {
    setRequest(value);
  };

  const changeGeo = value => {
    setIsGeo(value);
  };

  const changeMicrophone = value => {
    setIsMicrophone(value);
  };

  const changeSearchString = (value) => {
    setSearchString(value);
  };

  const changeCity = (value) => {
    setCity(value);
  };

  const fetchWeatherAndMapbox = () => {
    console.log('fetchWeather');
  }

  if (localStorage.getItem('touched') === null) {
    localStorage.setItem('volume', 1)
    localStorage.setItem('language', 'en');
    localStorage.setItem('scale', 'cel');
    localStorage.setItem('touched', true)
  }

  return (
    <MainContext.Provider value={{ searchString, changeSearchString, theme, changeTheme, city, changeCity, isGeo, changeGeo, isMicrophone, changeMicrophone, request, changeRequest, fetchWeatherAndMapbox }}>
      <WeatherApi>
          <Layout data-theme={theme}>
            <Header />
            <Main />
            <Footer />
          </Layout>
      </WeatherApi>
    </MainContext.Provider>
  )
};

export default App;
