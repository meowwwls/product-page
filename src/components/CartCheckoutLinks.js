import React from 'react';
import LinkBtn from './LinkBtn';

const CartCheckoutLinks = () => (
  <div className="product-page-cart-checkoutwrap">
    <LinkBtn
      classNames="product-page-checkout product-page-keepshopping btn"
      url="#"
      text="Continue Shopping"
    />
    <LinkBtn classNames="product-page-checkout btn" url="#" text="Checkout →" />
  </div>
);

export default CartCheckoutLinks;
