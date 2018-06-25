import React from 'react';

const Button = props => (
  <button onClick={props.handler} className={props.classNames}>
    {props.text}
  </button>
);

export default Button;
