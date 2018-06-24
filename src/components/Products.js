import React from 'react';
import Product from './Product';

const Products = props => {
  const items = props.products.map(item => {
    return (
      <Product
        key={item.id}
        product={item}
        updateCartFromList={props.updateCart}
      />
    );
  });

  return <ul>{items}</ul>;
};

export default Products;
