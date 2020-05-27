import React from 'react';
import './VirtualKeyboard.css';
import keys from './keys';

const VirtualKeyboard = () => {
  return (
    <div className='VirtualKeyboard hidden'>
      {
        Object.keys(keys).map((key, index) => {
          return (
            <div className='row' key={index}>
              {
                keys[key].map((item, index) => {
                  return (
                    <div className={'key ' + item.name} key={index}>
                      <span className={item.content[0].lang + ' hiddenLang'}>
                        <span className='down'>
                          {item.content[0].down}
                        </span>
                        <span className='up hiddenCase'>
                          {item.content[0].up}
                        </span>
                      </span>
                      <span className={item.content[1].lang}>
                        <span className='down'>
                          {item.content[1].down}
                        </span>
                        <span className='up hiddenCase'>
                          {item.content[1].up}
                        </span>
                      </span>
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  );
};

export default VirtualKeyboard;
