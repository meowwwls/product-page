import React from 'react';

const FeaturedPromo = props => (
  <p>
    <strong>{props.promo.promo}</strong> on {props.promo.onOrder}! Use code{' '}
    {props.promo.code}.
  </p>
);

export default FeaturedPromo;
