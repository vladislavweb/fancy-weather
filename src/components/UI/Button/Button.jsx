import React from 'react';
import './Button.css';

const Button = props => {
  return (
    <button
      onClick={props.click}
      className={`btn ${props.class}`}
      type={props.type}
      >
      {props.text}
    </button>
  );
};

export default Button;
