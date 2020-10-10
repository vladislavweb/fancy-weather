import React from 'react';
import './BadMicrophone.css';

const BadMicrophone = ({ lang }) => {
  return (
    <div className='bad-geo'>
      {lang === 'ru'
        ? ('Пожалуйста, предоставьте сайту доступ к вашему микрофону!')
        : lang === 'en'
          ? ('Please, grant the site access to your microphone!')
          : ('Будь ласка, надайте сайту доступ до Вашого мікрофону!')
      }
    </div>
  );
};

export default BadMicrophone;
