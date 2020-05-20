const changeShowScale = (scale) => {
  let allFar = Array.from(document.getElementsByClassName('far'));
  let allCel = Array.from(document.getElementsByClassName('cel'));

  if (scale === 'far') {
    allFar.map((item) => item.classList.remove('hidden'));
    allCel.map((item) => item.classList.add('hidden'));
  } else {
    allFar.map((item) => item.classList.add('hidden'));
    allCel.map((item) => item.classList.remove('hidden'));
  }
};

export default changeShowScale;
