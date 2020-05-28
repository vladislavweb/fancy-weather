import React, { useEffect } from 'react';
import './BadMicrophone.css';
import changeShowLang from '../../../scripts/changeShowLang';

const BadMicrophone = () => {
  useEffect(
    () => {
      changeShowLang(localStorage.getItem('language'));
    },
    []
  );

  return (
    <div className='bad-geo'>
      <span className='ru'>
        Пожалуйста, предоставьте сайту доступ к вашему микрофону!
      </span>
      <span className='en'>
        Please, grant the site access to your microphone!
      </span>
      <span className='be'>
        Калі ласка, падайце сайту доступ да вашага мікрафону!
      </span>
    </div>
  );
};

export default BadMicrophone;
