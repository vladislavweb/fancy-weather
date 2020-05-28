import React from 'react';
import './VirtualKeyboard.css';
import keys from './keys';

const VirtualKeyboard = () => {
  const changeCaseCycle = () => {
    const up = document.getElementsByClassName('up');
    const down = document.getElementsByClassName('down');
    for (let index = 0; index < up.length; index += 1) {
      up[index].classList.toggle('hiddenCase');
      down[index].classList.toggle('hiddenCase');
    };
  };

  const changeLang = () => {
    const rus = document.getElementsByClassName('rus');
    const eng = document.getElementsByClassName('eng');
    for (let index = 0; index < rus.length; index += 1) {
      rus[index].classList.toggle('hiddenLang');
      eng[index].classList.toggle('hiddenLang');
      rus[index].classList.toggle('show');
      eng[index].classList.toggle('show');
    };
  };

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
        break;

      case 'CapsLock':
        changeCaseCycle();
        break;

      case 'Enter':
        break;

      case 'Del':
        selectedSymbol = input.selectionStart;
        input.value = input.value.substring(0, input.selectionStart) + input.value.substring(input.selectionStart + 1)
        input.focus();
        input.selectionStart = selectedSymbol;
        input.selectionEnd = selectedSymbol;
        break;

      case '__________':
        selectedSymbol = input.selectionStart;
        input.value = input.value.substring(0, input.selectionStart) + oneSpace + input.value.substring(input.selectionStart);
        input.focus();
        input.selectionStart = selectedSymbol + 1;
        input.selectionEnd = selectedSymbol + 1;
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
        console.log('default');
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

  return (
    <div className='VirtualKeyboard hidden' onClick={(event) => handKeyboard(event)}>
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
