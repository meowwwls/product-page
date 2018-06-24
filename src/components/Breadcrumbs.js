import React from 'react';

const Breadcrumbs = props => (
  <nav
    className="breadcrumbs"
    aria-label="Breadcrumbs"
    itemScope
    itemType="http://data-vocabulary.org/Breadcrumb"
  >
    <a href="#" itemProp="url">
      <span itemProp="title">Home</span>
    </a>
    <span
      className="bread-trail"
      itemProp="child"
      itemScope
      itemType="http://data-vocabulary.org/Breadcrumb"
    >
      <a href="#" itemProp="url">
        <span itemProp="title">Products</span>
      </a>
    </span>
    <span
      className="bread-trail"
      itemProp="child"
      itemScope
      itemType="http://data-vocabulary.org/Breadcrumb"
    >
      <a href="#" itemProp="url">
        <span itemProp="title">Art Prints</span>
      </a>
    </span>
    <span
      className="bread-trail"
      itemProp="child"
      itemScope
      itemType="http://data-vocabulary.org/Breadcrumb"
    >
      <a href="#" className="breadcrumb-current" itemProp="url">
        <span itemProp="title">{props.currentPage}</span>
      </a>
    </span>
  </nav>
);
export default Breadcrumbs;
