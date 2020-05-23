const speak = () => {
  let currentLang = localStorage.getItem("language");
  let SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let speechRecognitionList = new SpeechGrammarList();
  let recognition = new SpeechRecognition();
  let grammar = "#JSGF V1.0;";
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.interimResults = false;

  switch (currentLang) {
    case "ru":
      recognition.lang = "ru-US";
      break;
    case "en":
      recognition.lang = "en-US";
      break;
    case "be":
      recognition.lang = "be-US";
      break;
    default:
  }

  recognition.onresult = function (event) {
    let last = event.results.length - 1;
    let command = event.results[last][0].transcript.toLowerCase();
    console.log("Произнесено: ", command);
    if (command === "plus" || command === "плюс" || command === "") {
      console.log("plus");
    }

    if (command === "minus" || command === "минус" || command === "мінус") {
      console.log("minus");
    }

    if (command === "sky" || command === "небо" || command === "неба") {
      console.log("sky");
    }
  };

  recognition.onspeechend = function () {
    recognition.stop();
  };

  recognition.onerror = function (event) {
    console.log("error");
  };

  recognition.start();
};

export default speak;
