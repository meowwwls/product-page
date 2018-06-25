import React from 'react';
import { Price } from '../helpers';
import Button from './Button';

const Component = React.Component;

const Product = ({ product, updateCartFromList }) => {
  const onSale = product.sale;
  const inStock = product.stock !== 0;
  const oos = !inStock && !product.inCart;

  const price = (() => {
    if (onSale) {
      return (
        <span>
          <s>{Price(product.price)}</s> {Price(product.sale)}
        </span>
      );
    } else {
      return `${Price(product.price)}`;
    }
  })();

  const btnOpts = (() => {
    let text;
    let currentClass;

    if (product.inCart) {
      text = 'Remove from Cart';
      currentClass = 'added';
    } else if (!product.inCart && inStock) {
      text = 'Add to Cart';
      currentClass = '';
    } else {
      text = 'Out of Stock';
      currentClass = 'oos';
    }

    return {
      text,
      currentClass
    };
  })();

  const saleFlag = () => {
    if (onSale) {
      return <span className="sale-flag">Sale</span>;
    } else {
      return <div />;
    }
  };

  return (
    <li className={`product ${oos ? ' oos' : ''}`}>
      <header>
        <h3 className="product-name">
          <a href="#">{product.name}</a>
        </h3>
        <p className="product-desc">{product.longdesc}</p>
      </header>
      <div className="inner-img-wrap">
        {saleFlag()}
        <a href="#" className="product-img-wrap">
          <img src={product.src} alt={product.longdesc} />
        </a>
      </div>
      <p className="product-price">{price}</p>
      <div className="product-add">
        <Button
          disabled={oos}
          handler={() => updateCartFromList(product.inCart, product.id)}
          text={btnOpts.text}
          classNames={`btn ${btnOpts.currentClass}`}
        />
      </div>
    </li>
  );
};

export default Product;
