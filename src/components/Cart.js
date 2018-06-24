import React from 'react';
import CartTableHead from './CartTableHead';
import CartItem from './CartItem';

const Cart = props => {
  const headers = ['Item', 'Price', 'Qty', 'Total', 'Remove'];
  const items = props.products.map(product => (
    <CartItem
      key={`${product.id}-cart`}
      product={product}
      inc={props.inc}
      dec={props.dec}
      updateQty={props.updateQty}
    />
  ));

  return (
    <table>
      <CartTableHead headings={headers} />

      <tbody>{items}</tbody>
    </table>
  );
};

export default Cart;
