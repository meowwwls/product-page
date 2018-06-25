import React from 'react';
import { Price } from '../helpers';
import CartItemBtn from './CartItemBtn';
import CartItemDesc from './CartItemDesc';
import CartItemQty from './CartItemQty';
import CartItemRemove from './CartItemRemove';

const Component = React.Component;

export default class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = { qty: 1 };

    this.updateState = this.updateState.bind(this);
    this.inc = this.inc.bind(this);
    this.dec = this.dec.bind(this);
    this.updateQty = this.updateQty.bind(this);
  }

  updateState(e) {
    if (e.target.value === '') {
      this.setState({ qty: '' });
      return;
    }

    this.setState({ qty: e.target.value });
  }

  updateQty() {
    const qty = parseInt(this.state.qty, 10) || 0;
    const diff = Math.abs(this.props.product.qty - qty);
    const totalStock = this.props.product.stock + this.props.product.qty;
    const currentQty = this.props.product.qty;

    if (diff === 0) {
      return;
    } else if (qty <= 0) {
      this.props.remove(this.props.product.id);
    } else if (qty > totalStock) {
      this.setState({ qty: totalStock });
      this.props.inc(this.props.product.id, totalStock - currentQty);
    } else if (qty < currentQty) {
      this.props.dec(this.props.product.id, diff);
    } else if (qty > currentQty) {
      this.props.inc(this.props.product.id, diff);
    }
  }

  inc() {
    if (this.props.product.stock === 0) return;
    this.setState({ qty: parseInt(this.state.qty, 10) + 1 });
    this.props.inc(this.props.product.id, 1);
  }

  dec() {
    console.log('dec');
    this.setState({ qty: parseInt(this.state.qty, 10) - 1 });
    this.props.dec(this.props.product.id, 1);
  }

  render() {
    const price = this.props.product.sale || this.props.product.price;

    return (
      <tr className="cart-item">
        <CartItemDesc product={this.props.product} />
        <CartItemQty
          product={this.props.product}
          qty={this.state.qty}
          decrement={this.dec}
          increment={this.inc}
          updateState={this.updateState}
          updateQty={this.updateQty}
        />
        <td>{Price(price)}</td>
        <td>{Price(price * this.props.product.qty)}</td>
        <CartItemRemove
          product={this.props.product}
          remove={this.props.remove}
        />
      </tr>
    );
  }
}
