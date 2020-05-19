import React, { useState } from 'react';
import './ControlPanel.css'
import Button from '../UI/Button/Button';

const ControlPanel = props => {
  const [buttons] = useState([
    {
      text: "",
      type: "button",
    },
    {
      text: "RU",
      type: "button",
    },
    {
      text: "EN",
      type: "button",
    },
    {
      text: "BE",
      type: "button",
    },
    {
      text: "°F",
      type: "button",
    },
    {
      text: "°C",
      type: "button",
    },
  ]);
  
  return (
    <div
      className='ControlPanel'
      onClick={props.onClick}
    >
      {
        buttons.map((item, index) => (
          <Button
            key={index}
            text={item.text}
            type={item.type}
          />
        ))
      }
    </div>
  );
};

export default ControlPanel;
