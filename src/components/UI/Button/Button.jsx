import React from 'react';
import './Button.css';

const Button = props => {
  return (
    <button
      className={`btn ${props.class}`}
      type={props.type}
      onClick={props.click}
      >
      {props.text}
    </button>
  );
};

export default Button;
