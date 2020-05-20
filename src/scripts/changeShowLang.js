const changeShowLang = (lang) => {
  let allRu = Array.from(document.getElementsByClassName('ru'));
  let allEn = Array.from(document.getElementsByClassName('en'));
  let allBe = Array.from(document.getElementsByClassName('be'));

  switch (lang) {
    case 'ru':
      allRu.map((item) => item.classList.remove('hidden'));
      allEn.map((item) => item.classList.add('hidden'));
      allBe.map((item) => item.classList.add('hidden'));
      break;
    case 'en':
      allEn.map((item) => item.classList.remove('hidden'));
      allRu.map((item) => item.classList.add('hidden'));
      allBe.map((item) => item.classList.add('hidden'));
      break;
    case 'be':
      allBe.map((item) => item.classList.remove('hidden'));
      allRu.map((item) => item.classList.add('hidden'));
      allEn.map((item) => item.classList.add('hidden'));
      break;
    default:
      break;
  };
};

export default changeShowLang;
