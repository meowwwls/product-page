import React from 'react';
import RemoveIcn from './RemoveIcn';
import IncIcn from './IncIcn';
import DecIcn from './DecIcn';

const CartItemBtn = props => (
  <button aria-label={props.label} onClick={props.handler}>
    {props.task === 'remove' ? (
      <RemoveIcn />
    ) : props.task === 'increase' ? (
      <IncIcn />
    ) : (
      <DecIcn />
    )}
  </button>
);

export default CartItemBtn;
