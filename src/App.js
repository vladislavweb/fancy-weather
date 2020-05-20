import React, { useState } from 'react';
import Layout from './hoc/Layout/Layout';
import Header from './containers/Header/Header'
import Footer from './containers/Footer/Footer';
import Main from './containers/Main/Main';
import { MainContext } from './MainContext';

const App = () => {
  const [searchString, setSearchString] = useState();
  const [theme, setTheme] = useState('black');

  const changeTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  };

  const changeSearchString = (value) => {
    setSearchString(value);
  };

  if (localStorage.getItem('touched') === null) {
    localStorage.setItem('language', 'en');
    localStorage.setItem('scale', 'cel');
    localStorage.setItem('touched', true)
  }

  return (
    <MainContext.Provider value={{searchString, changeSearchString, theme, changeTheme}}>
      <Layout data-theme={theme}>
        <Header />
        <Main />
        <Footer />
      </Layout>
    </MainContext.Provider>
  )
};

export default App;
