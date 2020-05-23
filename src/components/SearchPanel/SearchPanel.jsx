import React, { useState, useContext } from 'react';
import './SearchPanel.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { MainContext } from '../../MainContext';

const SearchPanel = props => {
  const { changeSearchString } = useContext(MainContext);

  const speak = () => {
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
      let currentVolume = localStorage.getItem("volume");
      let last = event.results.length - 1;
      let command = event.results[last][0].transcript.toLowerCase();
      console.log("Произнесено: ", command);
      if (command === "plus" || command === "плюс" || command === "плюс") {
        console.log("plus");
        if (currentVolume < 1) {
          localStorage.setItem("volume", (currentVolume / 1 + 0.1).toFixed(1));
        }
      } else if (command === "minus" || command === "минус" || command === "мінус") {
        console.log("minus");
        if (currentVolume >= 0) {
          localStorage.setItem("volume", (currentVolume / 1 - 0.1).toFixed(1));
        }
      } else if (command === "sky" || command === "небо" || command === "неба") {
        console.log("sky");
        let synth = window.speechSynthesis;
        let utterThis = new SpeechSynthesisUtterance("sky");
        utterThis.volume = localStorage.getItem("volume");
        synth.speak(utterThis);
      } else {
        changeSearchString(command);
      }
    };

    recognition.onspeechend = function () {
      recognition.stop();
    };

    recognition.onerror = function (event) {
      console.log('error');
    };

    recognition.start();
  };

  const { changeTheme } = useContext(MainContext);

  const [field, setField] = useState('');

  const [buttons] = useState([
    {
      text: '',
      type: 'button',
      click: speak,
    },
    {
      text: '',
      type: 'submit',
      click: () => console.log('sub'),
    },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    changeSearchString(field);
  };

  const changeThemeHandler = () => {
    changeTheme()
  }

  return (
    <div className="SearchPanel">
      <form onSubmit={handleSubmit}>
        <Input value={field} onChange={e => setField(e.target.value)} className='Test' />
        {
          buttons.map((item, index) => (
            <Button key={index} {...item}/>
          ))
        }
        <button onClick={() => changeThemeHandler()}>lol</button>
      </form>
    </div>
  );
};

export default SearchPanel;
