import React from 'react';
import './BadGeo.css';

const BadGeo = ({ lang }) => {
  return (
    <div className='bad-geo'>
      {lang === 'ru'
        ? ('Пожалуйста, предоставьте сайту информацию о вашей геолокации!')
        : lang === 'en'
          ? ('Please, provide the site with information about your location!')
          : ('Будь ласка, надайте сайту інформацію про вашу геолокації!')
      }
    </div>
  );
};

export default BadGeo;
