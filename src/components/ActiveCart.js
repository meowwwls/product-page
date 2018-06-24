import React from 'react';
import CartTableHead from './CartTableHead';
import CartItem from './CartItem';

const ActiveCart = props => {
  const headers = ['Item', 'Price', 'Qty', 'Total', 'Remove'];

  const increment = (id, amt) => {
    console.log('inc');
    const products = [...props.products];
    let product = products.find(item => item.id === id);
    const index = products.findIndex(item => item.id === product.id);

    if (product.stock > 0) {
      const updatedProduct = {
        ...product,
        qty: product.qty + amt,
        stock: product.stock - amt
      };

      products[index] = updatedProduct;
      props.updateState(products);
      props.updateStatus(
        `${product.name} quantity is now ${updatedProduct.qty}`
      );
    }
  };

  const decrement = (id, amt) => {
    const products = [...props.products];
    let product = products.find(item => item.id === id);
    const index = products.findIndex(item => item.id === product.id);

    const updatedProduct = {
      ...product,
      qty: product.qty - amt,
      stock: product.stock + amt
    };

    products[index] = updatedProduct;

    if (updatedProduct.qty === 0) {
      props.remove(id);
    } else {
      props.updateState(products);
      props.updateStatus(
        `${product.name} quantity is now ${updatedProduct.qty}`
      );
    }
  };

  const items = props.cartItems.map(product => (
    <CartItem
      key={`${product.id}-cart`}
      product={product}
      inc={increment}
      dec={decrement}
      remove={props.remove}
      updateOrder={props.updateOrder}
    />
  ));

  return (
    <table>
      <CartTableHead headings={headers} />
      <tbody>{items}</tbody>
    </table>
  );
};

export default ActiveCart;
