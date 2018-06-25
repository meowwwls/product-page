import React from 'react';
import FeaturedPromo from './FeaturedPromo';
import LoginLinks from './LoginLinks';
import CartTally from './CartTally';

const TopHeader = props => (
  <div className="top-links">
    <div className="account-cart">
      <LoginLinks />
      <CartTally cart={props.cart} />
    </div>
    <FeaturedPromo promo={props.promo} />
  </div>
);

export default TopHeader;
