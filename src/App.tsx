import { useState } from 'react';
import { Layout, Header, Main } from "./containers"
import { MainContext } from './mainContext';
import WeatherApi from './providers/weather/weatherApi';

const App = () => {
  const [city, setCity] = useState('Loading...');
  const [searchString, setSearchString] = useState('');
  const [isGeo, setIsGeo] = useState(true);
  const [isMicrophone, setIsMicrophone] = useState(true);
  const [request, setRequest] = useState(false);

  const changeRequest = (value: any) => setRequest(value);
  const changeGeo = (value: any) => setIsGeo(value);
  const changeMicrophone = (value: any) => setIsMicrophone(value);
  const changeSearchString = (value: any) => setSearchString(value);
  const changeCity = (value: any) => setCity(value);

  if (!localStorage.getItem('touched')) {
    localStorage.setItem('volume', "1");
    localStorage.setItem('language', 'en');
    localStorage.setItem('scale', 'cel');
    localStorage.setItem('touched', "true");
  }

  return (
    <MainContext.Provider value={{ searchString, changeSearchString, city, changeCity, isGeo, changeGeo, isMicrophone, changeMicrophone, request, changeRequest }}>
      <WeatherApi>
          <Layout>
            <Header />
            <Main />
          </Layout>
      </WeatherApi>
    </MainContext.Provider>
  )
};

export default App;
