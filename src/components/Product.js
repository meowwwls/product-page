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
    this.props.updateCartFromList(this.props.inCart, this.props.id);
  }

  render() {
    const onSale = this.props.sale;
    const price = onSale ? this.props.sale : this.props.price;
    const inStock = this.props.inStock;

    const btnText = () => {
      let text;

      if ((this.props.inCart && !inStock) || (this.props.inCart && inStock)) {
        text = 'Remove from Cart';
      } else if (!this.props.inCart && inStock) {
        text = 'Add to Cart';
      } else {
        text = 'Out of Stock';
      }

      return text;
    };

    return (
      <li className={'product' + (onSale ? ' sale' : '')}>
        <header>
          <h3>{this.props.name}</h3>
          <p>{this.props.desc}</p>
        </header>
        <div>
          <img src={this.props.src} alt={this.props.longdesc} />
        </div>
        <p>{price}</p>
        <div>
          <Button
            disabled={inStock}
            handler={this.handleClick}
            text={btnText()}
          />
          {inStock.toString()}
        </div>
      </li>
    );
  }
}
