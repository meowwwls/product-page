import React from 'react';

const LinkBtn = ({ url, classNames, text }) => (
  <a href={url} className={classNames}>
    {text}
  </a>
);

export default LinkBtn;
