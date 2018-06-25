import React, { Fragment } from 'react';
import Promo from './Promo';

const CartSummary = props => (
  <section>
    <h3 className="cart-heading">Order Summary</h3>
    <div className="cart-summary-items">
      <Promo apply={props.apply} promos={props.promos} />
      <dl>
        {props.items.map(item => (
          <Fragment key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </Fragment>
        ))}
      </dl>
    </div>
  </section>
);

export default CartSummary;
