import React from 'react';
import './BadRequest.css';

const BadRequest = ({ lang }) => {
  return (
    <div className='bad-request'>
      {lang === 'ru'
        ? ('Пожалуйста, введите корректный запрос!')
          : lang === 'en'
            ? ('Please, enter the correct query!')
            : ('Будь ласка, введіть коректний запит!')
      }
    </div>
  );
};

export default BadRequest;
