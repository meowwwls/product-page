import React from 'react';

const CartItem = props => {
  const updateQty = e => {
    props.updateQty(props.product.id, parseInt(e.target.value, 10));
  };

  return (
    <tr>
      <td>{JSON.stringify(props.product)}</td>
      <td>
        <button
          aria-label="decrease quantity"
          onClick={() => props.dec(props.product.id)}
        >
          –
        </button>
        <input
          type="text"
          aria-label="item quantity"
          name="qty"
          size="2"
          value={props.product.qty}
          onChange={updateQty}
        />
        <button
          aria-label="increase quantity"
          onClick={() => props.inc(props.product.id)}
        >
          +
        </button>
      </td>
      <td>remove</td>
    </tr>
  );
};

export default CartItem;
