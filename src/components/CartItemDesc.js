import React from 'react';

const CartItemDesc = ({ product }) => {
  const [itemType, size] = product.shortdesc;

  return (
    <td>
      <a
        href="#"
        className="cart-img-wrap"
        aria-describedby={`${product.id}-cartdesc`}
      >
        <img src={product.src} alt="" />
      </a>
      <div className="product-page-cart-item" id={`${product.id}-cartdesc`}>
        <span className="product-page-cart-itemname">
          <a href="#">{product.name}</a>
        </span>
        <span className="product-page-cart-itemdesc">{itemType}</span>&nbsp;
        {size}
      </div>
    </td>
  );
};

export default CartItemDesc;
