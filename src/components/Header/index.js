import React from 'react';
import './header.css';

const Header = (props) => {
  const { activeEmployees = false, activeSpecs = false } = props;

  return (
    <div id="header">
      <h2 className={activeEmployees ? 'page activePage' : 'page'}>
        თანამშრომლის ინფო
      </h2>

      <h2 className={activeSpecs ? 'page activePage' : 'page'}>
        ლეპტოპის მახასიათებლები
      </h2>
    </div>
  );
};

export default Header;
