import React, { useState, useContext, FC, useCallback } from "react";
import classNames from "classnames";
import { Input, IconButton } from "components";
import { DataContext, SettingsContext } from "providers";
import { Language } from "types";
import { Store } from "service";
import { TypeFetchData } from "api";
import Divider from "../divider";
import { ReactComponent as SearchIcon } from "./assets/search.svg";
import { ReactComponent as MicrophoneIcon } from "./assets/microphone.svg";
import "./searchPanel.scss";

const SearchPanel: FC = () => {
  const { language } = useContext(SettingsContext);
  const { getData, searchString, changeSearchString } = useContext(DataContext);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const localVolume = new Store<number>("volume");
  const localWeather = new Store<string>("weather");

  const onChangeSearchString: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    changeSearchString(e.target.value);
  }, []);

  const speak = () => {
    setIsSpeaking(true);

    const speechRecognitionList = window.SpeechGrammarList
      ? new window.SpeechGrammarList()
      : new window.webkitSpeechGrammarList();
    const recognition = window.SpeechRecognition
      ? new window.SpeechRecognition()
      : new window.webkitSpeechRecognition();
    const grammar = "#JSGF V1.0;";
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.interimResults = false;

    switch (language) {
      case Language.RU: {
        recognition.lang = "ru-US";

        break;
      }
      case Language.UK: {
        recognition.lang = "uk-US";

        break;
      }
      default: {
        recognition.lang = "en-US";

        break;
      }
    }

    recognition.onresult = function (event) {
      setIsSpeaking(false);

      const currentVolume = localVolume.read() || 1;
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.toLowerCase();

      switch (command) {
        case "louder":
        case "громче":
        case "мацней": {
          if (currentVolume < 1) {
            localVolume.write(Number((currentVolume / 1 + 0.1).toFixed(1)));
          }

          break;
        }
        case "quieter":
        case "тише":
        case "ціхі": {
          if (currentVolume >= 0) {
            localVolume.write(Number((currentVolume / 1 - 0.1).toFixed(1)));
          }

          break;
        }
        case "weather":
        case "погода":
        case "надвор'е": {
          const synth = window.speechSynthesis;
          const utterThis = new SpeechSynthesisUtterance(localWeather.read() || "");
          utterThis.volume = localVolume.read() || 1;

          switch (language) {
            case Language.RU: {
              utterThis.lang = `ru-US`;

              break;
            }
            case Language.UK: {
              utterThis.lang = `uk-US`;

              break;
            }
            default: {
              utterThis.lang = `en-US`;

              break;
            }
          }

          synth.speak(utterThis);

          break;
        }
        default: {
          if (command) {
            changeSearchString(command);

            getData({
              type: TypeFetchData.SEARCH_STRING,
              searchString: command,
            });
          }

          break;
        }
      }
    };

    recognition.onspeechend = function () {
      recognition.stop();
    };

    recognition.start();
  };

  const handleSubmit: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (searchString) {
      getData({
        type: TypeFetchData.SEARCH_STRING,
        searchString,
      });
    }
  };

  return (
    <div
      className={classNames("search-panel", {
        "search-panel--speaking": isSpeaking,
      })}
    >
      <div className="search-panel__layout">
        <form className="search-panel__form search-form" onSubmit={handleSubmit}>
          <Input
            className="search-form__input"
            value={searchString}
            onChange={onChangeSearchString}
            required={true}
            readOnly={isSpeaking}
          />

          <Divider />

          <IconButton className="search-form__speak-button" onClick={speak} type="button">
            <MicrophoneIcon />
          </IconButton>

          <Divider />

          <IconButton className="search-form__submit-button" type="submit" disabled={isSpeaking}>
            <SearchIcon />
          </IconButton>
        </form>
      </div>
    </div>
  );
};

export default SearchPanel;
