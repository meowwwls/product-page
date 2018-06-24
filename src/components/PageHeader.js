import React from 'react';
import Breadcrumbs from './Breadcrumbs';

const PageHeader = props => (
  <header className="main-header">
    <h1>
      <a href="#" title="Back to Homepage">
        Co. Name
      </a>
    </h1>
    <Breadcrumbs currentPage={props.page} />
    <div className="header-img-container">
      <img
        src="http://res.cloudinary.com/meowwwls/image/upload/v1462972440/md-projects/product-page/print-header.jpg"
        alt=""
      />
      <h2 className="product-page-title">{props.pageTitle}</h2>
    </div>
  </header>
);

export default PageHeader;
