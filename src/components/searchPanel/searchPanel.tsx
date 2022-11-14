import { useState, useContext, FC } from "react";
import Input from "../input";
import Button from "../button";
import { SettingsContext } from "../../providers";
import { Language } from "../../types";
import "./searchPanel.scss";

const SearchPanel: FC = () => {
  const { language } = useContext(SettingsContext);
  // const [str, setStr] = useState("");

  const speak = () => {
    let input = document.getElementsByClassName("search-input")[0] as any;
    document.getElementsByClassName("SearchPanel")[0].classList.add("speaked");
    // changeMicrophone(false);
    let SpeechGrammarList =
      (window as any).SpeechGrammarList || (window as any).webkitSpeechGrammarList;
    let SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    let speechRecognitionList = new SpeechGrammarList();
    let recognition = new SpeechRecognition();
    let grammar = "#JSGF V1.0;";
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.interimResults = false;

    switch (language) {
      case Language.RU:
        recognition.lang = "ru-US";
        break;
      case Language.EN:
        recognition.lang = "en-US";
        break;
      case Language.UA:
        recognition.lang = "ua-US";
        break;
      default:
    }

    recognition.onresult = function (event: any) {
      document.getElementsByClassName("SearchPanel")[0].classList.remove("speaked");
      let currentVolume = localStorage.getItem("volume") as any;
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
        let utterThis = new SpeechSynthesisUtterance(
          sessionStorage.getItem(`weather-${localStorage.getItem("language") || ""} || "`) || "",
        ) as any;
        utterThis.volume = localStorage.getItem("volume");
        switch (localStorage.getItem("language")) {
          case "ru":
            utterThis.lang = `ru-US`;
            break;
          case "en":
            utterThis.lang = `en-US`;
            break;
          case "ua":
            utterThis.lang = `ua-US`;
            break;
          default:
        }
        synth.speak(utterThis);
      } else {
        // changeSearchString(command);
        // setStr(input.value);
      }
    };

    recognition.onspeechend = function () {
      document.getElementsByClassName("SearchPanel")[0].classList.remove("speaked");
      recognition.stop();
    };

    recognition.onerror = function (event: any) {
      document.getElementsByClassName("SearchPanel")[0].classList.remove("speaked");
      // changeMicrophone(true);
      console.log(event);
    };

    recognition.start();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  return (
    <div className="search-panel">
      <form className="search-form" onSubmit={handleSubmit}>
        <Input className="search-input" />

        <Button className="speak-button" onClick={speak} />

        <Button className="search-button" type="submit" />
      </form>
    </div>
  );
};

export default SearchPanel;
