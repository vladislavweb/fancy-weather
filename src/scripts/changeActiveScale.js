const changeActiveScale = (scale) => {
  const cel = document.getElementsByClassName('scale-cel')[0];
  const far = document.getElementsByClassName('scale-far')[0];

  switch (scale) {
    case 'cel':
      cel.classList.add('active-btn');
      far.classList.remove('active-btn');
      break;
    case 'far':
      far.classList.add('active-btn');
      cel.classList.remove('active-btn');
      break;
    default:
  };
};

export default changeActiveScale;
