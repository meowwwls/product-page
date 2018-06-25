import React from 'react';
import CartItemBtn from './CartItemBtn';

const CartItemQty = props => (
  <td>
    <CartItemBtn
      label="decrease quantity"
      handler={props.decrement}
      task="decrease"
      inStock={props.product.stock}
    />
    <input
      type="number"
      className="product-page-item-qty"
      aria-label="item quantity"
      name="qty"
      onChange={props.updateState}
      value={props.qty}
      onBlur={props.updateQty}
    />
    <CartItemBtn
      label="increase quantity"
      handler={props.increment}
      task="increase"
      inStock={props.product.stock}
    />
  </td>
);

export default CartItemQty;
