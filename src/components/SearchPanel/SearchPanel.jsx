import React, { useState, useContext, useEffect } from 'react';
import './SearchPanel.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { MainContext } from '../../MainContext';
import toggleKeyboard from '../../scripts/toggleKeyboard';
import { WeatherContext } from '../../Context/WeatherContext';

const SearchPanel = props => {
  const { searchString, changeSearchString, changeMicrophone } = useContext(MainContext);
  const { getData } = useContext(WeatherContext);

  useEffect(
    () => {
      changeMicrophone(false);
    },
    []
  );

  const speak = () => {
    document.getElementsByClassName('SearchPanel')[0].classList.add('speaked')
    changeMicrophone(false);
    let currentLang = localStorage.getItem('language');
    let SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let speechRecognitionList = new SpeechGrammarList();
    let recognition = new SpeechRecognition();
    let grammar = "#JSGF V1.0;";
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.interimResults = false;

    switch (currentLang) {
      case 'ru':
        recognition.lang = "ru-US";
        break;
      case 'en':
        recognition.lang = "en-US";
        break;
      case 'be':
        recognition.lang = "be-US";
        break;
      default:
    };

    recognition.onresult = function (event) {
      document.getElementsByClassName('SearchPanel')[0].classList.remove('speaked');
      let currentVolume = localStorage.getItem("volume");
      let last = event.results.length - 1;
      let command = event.results[last][0].transcript.toLowerCase();
      console.log("Произнесено: ", command);
      if (command === "louder" || command === "громче" || command === "мацней") {
        if (currentVolume < 1) {
          localStorage.setItem("volume", (currentVolume / 1 + 0.1).toFixed(1));
        }
      } else if (command === "quieter" || command === "тише" || command === "ціхі") {
        if (currentVolume >= 0) {
          localStorage.setItem("volume", (currentVolume / 1 - 0.1).toFixed(1));
        }
      } else if (command === "weather" || command === "погода" || command === "надвор'е") {
        let synth = window.speechSynthesis;
        let utterThis = new SpeechSynthesisUtterance(sessionStorage.getItem(`weather-${localStorage.getItem('language')}`));
        utterThis.volume = localStorage.getItem("volume");
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
      } else {
        changeSearchString(command);
      };
    };

    recognition.onspeechend = function () {
      document.getElementsByClassName('SearchPanel')[0].classList.remove('speaked');
      recognition.stop();
    };

    recognition.onerror = function (event) {
      document.getElementsByClassName('SearchPanel')[0].classList.remove('speaked');
      changeMicrophone(true);
      console.log(event);
    };

    recognition.start();
  };

  const [buttons] = useState([
    {
      text: '',
      type: 'button',
      click: speak,
      class: 'speak',
    },
    {
      text: '',
      type: 'button',
      click: toggleKeyboard,
      class: 'toggle-keyboard',
    },
    {
      text: '',
      type: 'submit',
      click: () => console.log('submit'),
      class: 'submit-form',
    },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    getData()
  };

  return (
    <div className="SearchPanel">
      <form onSubmit={handleSubmit}>
        <Input value={searchString} onChange={e => changeSearchString(e.target.value)} />
        {
          buttons.map((item, index) => (
            <Button key={index} {...item} />
          ))
        }
      </form>
    </div>
  );
};

export default SearchPanel;
