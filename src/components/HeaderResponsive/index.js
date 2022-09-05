import React from 'react';
import './headerResponsive.css';

const HeaderResponsive = (props) => {
  const { text, page } = props;

  return (
    <header id="responvieHeader">
      <h2 id="responsiveHeaderTxt">{text}</h2>
      {page && <p id="responsivePageTxt">{page}/2</p>}
    </header>
  );
};

export default HeaderResponsive;
