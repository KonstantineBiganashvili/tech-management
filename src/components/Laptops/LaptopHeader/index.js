import React from 'react';
import './laptopHeader.css';

const LaptopHeader = (props) => {
  const { text } = props;

  return <h2 className="laptopHeader">{text}</h2>;
};

export default LaptopHeader;
