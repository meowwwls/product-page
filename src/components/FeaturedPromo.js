import React from 'react';

const FeaturedPromo = ({ promo }) => (
  <p className="promo-code">
    <strong className="promo-color">{promo.promo}</strong> on {promo.onOrder}!
    Use code <strong className="promo-color">{promo.code}</strong>
  </p>
);

export default FeaturedPromo;
