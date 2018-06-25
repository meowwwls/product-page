import React from 'react';

const Button = props => (
  <button
    onClick={props.handler}
    className={props.classNames}
    disabled={props.disabled}
  >
    {props.text}
  </button>
);

export default Button;
