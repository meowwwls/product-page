import React from 'react';
import Button from './Button';

const Component = React.Component;

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addText: 'Add to Cart',
      removeText: 'Remove from Cart'
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.updateCartFromList(
      this.props.product.inCart,
      this.props.product.id
    );
  }

  render() {
    const onSale = this.props.product.sale;
    const price = onSale ? this.props.product.sale : this.props.product.price;
    // const inStock = this.props.product.stock;
    const inStock = this.props.product.stock !== 0;

    const btnText = () => {
      let text;

      if (
        (this.props.product.inCart && !inStock) ||
        (this.props.product.inCart && inStock)
      ) {
        text = 'Remove from Cart';
      } else if (!this.props.product.inCart && inStock) {
        text = 'Add to Cart';
      } else {
        text = 'Out of Stock';
      }

      return text;
    };

    return (
      <li className={'product' + (onSale ? ' sale' : '')}>
        <header>
          <h3>{this.props.product.name}</h3>
          <p>{this.props.product.desc}</p>
        </header>
        <div>
          <img src={this.props.product.src} alt={this.props.product.longdesc} />
        </div>
        <p>{price}</p>
        <div>
          <Button
            disabled={!inStock}
            handler={this.handleClick}
            text={btnText()}
          />
        </div>
      </li>
    );
  }
}
