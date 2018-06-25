import React from 'react';
import CartTableHead from './CartTableHead';
import CartItem from './CartItem';

const Component = React.Component;

export default class ActiveCart extends Component {
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment(id, amt) {
    const products = [...this.props.products];
    let product = products.find(item => item.id === id);
    const index = products.findIndex(item => item.id === product.id);

    if (product.stock > 0) {
      const updatedProduct = {
        ...product,
        qty: product.qty + amt,
        stock: product.stock - amt
      };

      products[index] = updatedProduct;
      this.props.updateState(products);
      this.props.updateStatus(
        `${product.name} quantity is now ${updatedProduct.qty}`
      );
    }
  }

  decrement(id, amt) {
    const products = [...this.props.products];
    let product = products.find(item => item.id === id);
    const index = products.findIndex(item => item.id === product.id);

    const updatedProduct = {
      ...product,
      qty: product.qty - amt,
      stock: product.stock + amt
    };

    products[index] = updatedProduct;

    if (updatedProduct.qty === 0) {
      this.props.remove(id);
    } else {
      this.props.updateState(products);
      this.props.updateStatus(
        `${product.name} quantity is now ${updatedProduct.qty}`
      );
    }
  }

  render() {
    const headers = ['Item', 'Price', 'Qty', 'Total', 'Remove'];

    const items = this.props.cartItems.map(product => (
      <CartItem
        key={`${product.id}-cart`}
        product={product}
        inc={this.increment}
        dec={this.decrement}
        remove={this.props.remove}
        updateOrder={this.props.updateOrder}
      />
    ));

    return (
      <table className="product-page-cart">
        <CartTableHead headings={headers} />
        <tbody>{items}</tbody>
      </table>
    );
  }
}
