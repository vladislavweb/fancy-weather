import React from 'react';
import './Button.css';

const Button = (props) => {
  const { className, text, type, ...restProps } = props;
  const classComponent = `btn ${className}`;

  return (
    <button
      className={classComponent}
      type={type ? type : 'button'}
      {...restProps}
    >
      {text}
    </button>
  );
};

export default Button;
