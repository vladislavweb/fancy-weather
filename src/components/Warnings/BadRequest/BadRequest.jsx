import React, { useEffect } from 'react';
import './BadRequest.css';
import changeShowLang from '../../../scripts/changeShowLang';

const BadRequest = () => {
  useEffect(
    () => {
      changeShowLang(localStorage.getItem('language'))
    },
    []
  );

  return (
    <div className='bad-request'>
      <span className='ru'>
        Пожалуйста, введите корректный запрос!
      </span>
      <span className='en'>
        Please, enter the correct query!
      </span>
      <span className='be'>
        Калі ласка, увядзіце правільны запыт!
      </span>
    </div>
  );
};

export default BadRequest;
