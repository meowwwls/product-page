import React from 'react';

const CartTally = props => {
  const tally = props.cart.reduce((sum, cur) => cur.qty + sum, 0);

  return (
    <a
      href="#cart-header"
      className="top-cart-links"
      aria-label="shopping cart"
    >
      <span className="top-cart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="top-cart-icon"
          width="20"
          height="20"
          viewBox="0 0 512 512"
        >
          <g id="icomoon-ignore" />
          <path
            fill="#767676"
            d="M510.624 86.4l-46.624 185.6c0 2.224-0.448 4.32-1.248 6.224-1.632 3.84-4.688 6.912-8.512 8.528-1.92 0.816-4.032 1.248-6.24 1.248h-304l12.8 64h275.2c8.848 0 16 7.152 16 16s-7.152 16-16 16h-288c-8.848 0-16-7.152-16-16l-60.8-304h-51.2c-8.832 0-16-7.168-16-16s7.168-16 16-16h64c8.848 0 16 7.168 16 16l3.2 16h396.8c8.848 0 16 7.168 16 16 0 2.288-0.512 4.432-1.376 6.4zM137.6 256h54.4v-160h-86.4l32 160zM288 96h-80v160h80v-160zM384 96h-80v160h80v-160zM400 96v160h36.048l40.528-160h-76.576zM176 416c26.512 0 48 21.504 48 48s-21.488 48-48 48-48-21.504-48-48 21.488-48 48-48zM176 480c8.848 0 16-7.152 16-16s-7.152-16-16-16-16 7.152-16 16 7.152 16 16 16zM400 416c26.512 0 48 21.504 48 48s-21.488 48-48 48-48-21.504-48-48 21.488-48 48-48zM400 480c8.848 0 16-7.152 16-16s-7.152-16-16-16-16 7.152-16 16 7.152 16 16 16z"
          />
        </svg>
      </span>
      <strong id="top-cart-count">
        ({`${tally} ${tally > 1 || tally === 0 ? 'items' : 'item'}`})
      </strong>
    </a>
  );
};

export default CartTally;
