import React from 'react';
import CartTableHead from './CartTableHead';
import ActiveCart from './ActiveCart';
import EmptyCart from './EmptyCart';

const Cart = props => {
  const getCart = () => {
    if (props.cart.length === 0) {
      return <EmptyCart />;
    } else {
      return (
        <ActiveCart
          updateStatus={props.updateStatus}
          products={props.products}
          cartItems={props.cart}
          remove={props.remove}
          updateState={props.updateState}
          updateOrder={props.updateOrder}
        />
      );
    }
  };

  return (
    <section className="product-page-cart-summary">
      <h3 className="cart-heading">Shopping Bag</h3>
      {getCart()}
    </section>
  );
};

export default Cart;
