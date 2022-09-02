import React from 'react';

const Select = (props) => {
  const { selectName } = props;

  return <option>{selectName}</option>;
};

export default Select;
