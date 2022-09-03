import React from 'react';

const Select = (props) => {
  const { selectName, value } = props;

  return <option value={value}>{selectName}</option>;
};

export default Select;
