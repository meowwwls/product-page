import React from 'react';

const Categories = () => {
  const labels = ['New', 'Products', 'Collections', 'Sale'];
  const links = labels.map(label => (
    <li key={label}>
      <a href="#" className={label === 'Sale' ? 'sm-hide' : ''}>
        {label}
      </a>
    </li>
  ));

  return (
    <nav className="main-nav" aria-label="Categories">
      <ul aria-label="categories">{links}</ul>
    </nav>
  );
};

export default Categories;
