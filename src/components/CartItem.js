import React from 'react';
import CartItemBtn from './CartItemBtn';

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
    this.setState({ qty: parseInt(this.state.qty, 10) - 1 });
    this.props.dec(this.props.product.id, 1);
  }

  render() {
    const [prodType, size] = this.props.product.shortdesc;
    const price = this.props.product.sale || this.props.product.price;

    return (
      <tr>
        <td>
          <a
            href="#"
            className="cart-img-wrap"
            aria-describedby={`${this.props.product.id}-cartdesc`}
          >
            <img src={this.props.product.src} alt="" />
          </a>
          <div
            className="product-page-cart-item"
            id={`${this.props.product.id}-cartdesc`}
          >
            <span className="product-page-cart-itemname">
              <a href="#">{this.props.product.name}</a>
            </span>&nbsp;
            <span className="product-page-cart-itemdesc">{prodType}</span>&nbsp;
            {size}
          </div>
        </td>
        <td>{price}</td>
        <td>
          <CartItemBtn
            label="decrease quantity"
            handler={this.dec}
            task="decrease"
            inStock={this.props.product.stock}
          />
          <input
            type="number"
            aria-label="item quantity"
            name="qty"
            onChange={this.updateState}
            value={this.state.qty}
            onBlur={this.updateQty}
          />
          <CartItemBtn
            label="increase quantity"
            handler={this.inc}
            task="increase"
            inStock={this.props.product.stock}
          />
        </td>
        <td>{price * this.props.product.qty}</td>
        <td>
          <CartItemBtn
            label="remove item"
            handler={() => this.props.remove(this.props.product.id)}
            task="remove"
            inStock={this.props.product.stock}
          />
        </td>
      </tr>
    );
  }
}
