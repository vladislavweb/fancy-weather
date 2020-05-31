const changeActiveLang = (lang) => {
  const ru = document.getElementsByClassName('lang-ru')[0];
  const en = document.getElementsByClassName('lang-en')[0];
  const be = document.getElementsByClassName('lang-be')[0];
  switch (lang) {
    case 'ru':
      ru.classList.add('active-btn');
      en.classList.remove('active-btn');
      be.classList.remove('active-btn');
      break;
    case 'en':
      en.classList.add('active-btn');
      ru.classList.remove('active-btn');
      be.classList.remove('active-btn');
      break;
    case 'be':
      be.classList.add('active-btn');
      ru.classList.remove('active-btn');
      en.classList.remove('active-btn');
      break;
    default:
  };
};

export default changeActiveLang;
