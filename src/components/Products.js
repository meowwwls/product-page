import React from 'react';
import Product from './Product';

const Products = props => {
  const items = props.products.map(item => {
    return (
      <Product
        key={item.id}
        id={item.id}
        src={item.src}
        name={item.name}
        updateCartFromList={props.updateCart}
        sale={item.sale}
        price={item.price}
        desc={item.longdesc}
        inCart={item.inCart}
        inStock={item.stock}
      />
    );
  });

  return <ul>{items}</ul>;
};

export default Products;
