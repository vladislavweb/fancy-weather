import React, { useContext, useState, useEffect } from 'react';
import { MainContext } from '../../MainContext';
import { WeatherContext } from '../../Context/WeatherContext';
import keys from './keys';
import './VirtualKeyboard.css';

const VirtualKeyboard = () => {
  const { changeSearchString } = useContext(MainContext);
  const { getData } = useContext(WeatherContext);
  const [layout, setLayout] = useState('down');
  const [langKeyboard, setLangKeoboard] = useState('en');
  const [virtualText, setVirtualText] = useState('');

  const changeCaseCycle = () => layout === 'down' ? setLayout('up') : setLayout('down');
  const changeLang = () => langKeyboard === 'en' ? setLangKeoboard('ru') : setLangKeoboard('en');

  const activeClick = (event) => {
    let currentClick = '';
    if (event.target.classList[0] === 'down' || event.target.classList[0] === 'up') {
      currentClick = event.target.parentNode.parentNode;
    } else {
      currentClick = event.target;
    };
    currentClick.classList.add('active');
    setTimeout(() => {
      currentClick.classList.remove('active');
    }, 200);
  };

  const specKey = (event) => {
    let input = document.getElementsByClassName('search-input')[0];
    let selectedSymbol = input.selectionStart;
    const oneSpace = ' ';
    const fourSpace = '    ';
    switch (event.target.innerText) {
      case 'Backspace':
        selectedSymbol = input.selectionStart;
        if (selectedSymbol > 0) {
          input.value = input.value.substring(0, input.selectionStart - 1) + input.value.substring(input.selectionStart)
          input.focus();
          input.selectionStart = selectedSymbol - 1;
          input.selectionEnd = selectedSymbol - 1;
          setVirtualText(input.value);
        } else {
          input.focus();
        }
        break;

      case 'Tab':
        selectedSymbol = input.selectionStart;
        input.value = input.value.substring(0, input.selectionStart) + fourSpace + input.value.substring(input.selectionStart);
        input.focus();
        input.selectionStart = selectedSymbol + 4;
        input.selectionEnd = selectedSymbol + 4;
        setVirtualText(input.value);
        break;

      case 'CapsLock':
        changeCaseCycle();
        break;

      case 'Enter':
        getData();
        changeSearchString(virtualText);
        setVirtualText('');
        break;

      case 'Del':
        selectedSymbol = input.selectionStart;
        input.value = input.value.substring(0, input.selectionStart) + input.value.substring(input.selectionStart + 1)
        input.focus();
        input.selectionStart = selectedSymbol;
        input.selectionEnd = selectedSymbol;
        setVirtualText(input.value);
        break;

      case '__________':
        selectedSymbol = input.selectionStart;
        input.value = input.value.substring(0, input.selectionStart) + oneSpace + input.value.substring(input.selectionStart);
        input.focus();
        input.selectionStart = selectedSymbol + 1;
        input.selectionEnd = selectedSymbol + 1;
        setVirtualText(input.value);
        break;

      case 'Language':
        changeLang();
        break;

      case '◄':
        input.focus()
        input.selectionStart = input.selectionStart - 1;
        input.selectionEnd = input.selectionEnd - 1;
        break;

      case '►':
        input.focus();
        input.selectionStart += 1;
        break;

      default:
    };
  };

  const typeText = (event) => {
    let input = document.getElementsByClassName('search-input')[0];
    let selectedSymbol = input.selectionStart;
    let clickedItem = event.target.classList[0];
    if (clickedItem === 'down' || clickedItem === 'up' || clickedItem === 'key') {
      let currentSymbol = event.target.innerText;
      if (currentSymbol.length === 1 && currentSymbol !== '◄' && currentSymbol !== '►') {
        input.value = input.value.substring(0, input.selectionStart) + currentSymbol + input.value.substring(input.selectionStart);
        setVirtualText(virtualText + currentSymbol);
        input.focus();
        input.selectionStart = selectedSymbol + 1;
        input.selectionEnd = selectedSymbol + 1;
      };
    };
  };

  const handKeyboard = (event) => {
    activeClick(event);
    specKey(event);
    typeText(event);
  };

  useEffect(() => {
    changeSearchString(virtualText);
  }, [virtualText])

  return (
    <div className='VirtualKeyboard' onClick={(event) => handKeyboard(event)}>
      {Object.keys(keys).map((key, index) => {
        return (
          <div className='row' key={index}>
            {keys[key].map((item, index) => {
              return (
                <div className={'key ' + item.name} key={index}>
                  {langKeyboard === 'en' && (
                    <span className={item.content[1].lang}>
                      {layout === 'down'
                        ? (item.content[1].down)
                        : (item.content[1].up)
                      }
                    </span>
                  )}

                  {langKeyboard === 'ru' && (
                    <span className={item.content[0].lang}>
                      {layout === 'down'
                        ? (item.content[0].down)
                        : (item.content[0].up)
                      }
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        )
      })
    }
    </div>
  );
};

export default VirtualKeyboard;
