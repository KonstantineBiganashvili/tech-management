import React from 'react';

const Errors = ({ errors }) => {
  return errors.map((element) => {
    return <li>{element}</li>;
  });
};

export default Errors;
