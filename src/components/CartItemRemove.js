import React from 'react';
import CartItemBtn from './CartItemBtn';

const CartItemRemove = ({ product, remove }) => (
  <td>
    <CartItemBtn
      label="remove item"
      handler={() => remove(product.id)}
      task="remove"
    />
  </td>
);

export default CartItemRemove;
