import React, { useState, useContext, FC, useCallback } from "react";
import classNames from "classnames";
import Input from "../input";
import Button from "../button";
import { MapQuestContext, SettingsContext } from "../../providers";
import { Language, TypeRequest } from "../../types";
import { Store } from "../../service";
import "./searchPanel.scss";

const SearchPanel: FC = () => {
  const { language } = useContext(SettingsContext);
  const { changeMapQuestData } = useContext(MapQuestContext);
  const [searchString, setSearchString] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const localVolume = new Store<number>("volume");
  const localWeather = new Store<string>("weather");

  const onChangeSearchString: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setSearchString(e.target.value);
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
            setSearchString(command);

            changeMapQuestData({
              typeRequest: TypeRequest.geocoding,
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
      changeMapQuestData({
        typeRequest: TypeRequest.geocoding,
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
      <form className="search-form" onSubmit={handleSubmit}>
        <Input
          className="search-input"
          value={searchString}
          onChange={onChangeSearchString}
          required={true}
          readOnly={isSpeaking}
        />

        <Button className="speak-button" onClick={speak} type="button" />

        <Button className="search-button" type="submit" disabled={isSpeaking} />
      </form>
    </div>
  );
};

export default SearchPanel;
