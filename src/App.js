import React, { useState, useEffect } from 'react';
import Layout from './hoc/Layout/Layout';
import Header from './containers/Header/Header'
import Footer from './containers/Footer/Footer';
import Main from './containers/Main/Main';
import { MainContext } from './MainContext';
import WeatherApi from './Context/WeatherContext/WeatherApi';

const App = () => {
  const [city, setCity] = useState('Loading...');
  const [searchString, setSearchString] = useState('');
  const [isGeo, setIsGeo] = useState(true);
  const [isMicrophone, setIsMicrophone] = useState(true);
  const [request, setRequest] = useState(false);

  useEffect(() => {
    console.log('Голосовое управления происходит на языке отображения страницы:');
    console.log('погода || weather || надворe');
    console.log('громче || louder || мацней');
    console.log('тише || quieter || ціхі');
  }, [])

  const changeRequest = value => setRequest(value);
  const changeGeo = value => setIsGeo(value);
  const changeMicrophone = value => setIsMicrophone(value);
  const changeSearchString = value => setSearchString(value);
  const changeCity = value => setCity(value);

  if (!localStorage.getItem('touched')) {
    localStorage.setItem('volume', 1);
    localStorage.setItem('language', 'en');
    localStorage.setItem('scale', 'cel');
    localStorage.setItem('touched', true);
  }

  return (
    <MainContext.Provider value={{ searchString, changeSearchString, city, changeCity, isGeo, changeGeo, isMicrophone, changeMicrophone, request, changeRequest }}>
      <WeatherApi>
          <Layout>
            <Header />
            <Main />
            <Footer />
          </Layout>
      </WeatherApi>
    </MainContext.Provider>
  )
};

export default App;
