import React from 'react';
import FeaturedPromo from './FeaturedPromo';
import LoginLinks from './LoginLinks';
import CartTally from './CartTally';

const TopHeader = props => (
  <div>
    <FeaturedPromo promo={props.promo} />
    <div>
      <LoginLinks />
      <CartTally cart={props.cart} />
    </div>
  </div>
);

export default TopHeader;
