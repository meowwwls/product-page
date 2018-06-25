import React from 'react';
import Product from './Product';

const Products = ({ products, updateCart }) => {
  const items = products.map(item => {
    return (
      <Product key={item.id} product={item} updateCartFromList={updateCart} />
    );
  });

  return <ul className="product-list">{items}</ul>;
};

export default Products;
