import React, { useState } from 'react';
import './ControlPanel.css'
import Button from '../UI/Button/Button';

const ControlPanel = props => {
  const [buttons] = useState([
    {
      text: "",
      type: "button",
      class: 'Change-back',
    },
    {
      text: " ",
      type: "button",
      class: 'Speak-weather',
    },
    {
      text: "RU",
      type: "button",
      class: 'lang-ru',
    },
    {
      text: "EN",
      type: "button",
      class: 'lang-en',
    },
    {
      text: "BE",
      type: "button",
      class: 'lang-be',
    },
    {
      text: "°F",
      type: "button",
      class: 'scale-far',
    },
    {
      text: "°C",
      type: "button",
      class: 'scale-cel'
    },
  ]);

  return (
    <div className='ControlPanel' onClick={props.onClick} style={{display: 'flex'}}>
      {
        buttons.map((item, index) => (
          <Button key={index} {...item} />
        ))
      }
    </div>
  );
};

export default ControlPanel;
