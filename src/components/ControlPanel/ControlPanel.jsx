import React, { useContext } from 'react';
import { WeatherContext } from '../../Context/WeatherContext';
import Button from '../UI/Button/Button';
import './ControlPanel.css'

const ControlPanel = () => {
  const { changeCurrentLang, changeCurrentScale, currentLang, currentScale } = useContext(WeatherContext);

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
    let utterThis = new SpeechSynthesisUtterance(sessionStorage.getItem(`weather-${currentLang}`));

    switch (currentLang) {
      case 'ru':
        utterThis.lang = `ru-US`;
        break;
      case 'en':
        utterThis.lang = `en-US`;
        break;
      case 'ua':
        utterThis.lang = `ua-US`;
        break;
      default:
    };

    synth.speak(utterThis);
  };

  return (
    <div className='ControlPanel'>
      <Button
        text = ''
        className ='Change-back'
        onClick={changeBackground}
      />

      <Button
        text = " "
        className = 'Speak-weather'
        onClick={speakWeather}
      />

      <Button
        text = "RU"
        className={currentLang === 'ru' ? 'lang-ru control-current' : 'lang-ru'}
        onClick={() => {
          changeCurrentLang('ru');
          localStorage.setItem('language', 'ru');
        }}
      />

      <Button
        text = "EN"
        className={currentLang === 'en' ? 'lang-en control-current' : 'lang-en'}
        onClick={() => {
          changeCurrentLang('en');
          localStorage.setItem('language', 'en');
        }}
      />

      <Button
        text = "UA"
        className={currentLang === 'ua' ? 'lang-ua control-current' : 'lang-ua'}
        onClick={() => {
          changeCurrentLang('ua');
          localStorage.setItem('language', 'ua');
        }}
      />

      <Button
        text = "°F"
        className={currentScale === 'far' ? 'scale-far control-current' : 'scale-far'}
        onClick={() => {
          changeCurrentScale('far');
          localStorage.setItem('scale', 'far')
        }}
      />

      <Button
        text = "°C"
        className={currentScale === 'cel' ? 'scale-cel control-current' : 'scale-cel'}
        onClick={() => {
          changeCurrentScale('cel');
          localStorage.setItem('scale', 'cel');
        }}
      />
    </div>
  );
};

export default ControlPanel;
