import React from 'react';

const CartTableHead = props => {
  const ths = props.headings.map(heading => <th key={heading}>{heading}</th>);
  return (
    <thead>
      <tr>{ths}</tr>
    </thead>
  );
};

export default CartTableHead;
