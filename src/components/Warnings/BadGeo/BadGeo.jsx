import React, { useEffect } from 'react';
import './BadGeo.css';
import changeShowLang from '../../../scripts/changeShowLang';

const BadGeo = () => {
  useEffect(
    () => {
      changeShowLang(localStorage.getItem('language'));
    },
    []
  );

  return (
    <div className='bad-geo'>
      <span className='ru'>
        Пожалуйста, предоставьте сайту информацию о вашей геолокации!
      </span>
      <span className='en'>
        Please, provide the site with information about your location!
      </span>
      <span className='be'>
        Калі ласка, падайце сайту інфармацыю аб вашай геолокации!
      </span>
    </div>
  );
};

export default BadGeo;
