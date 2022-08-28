import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div id="landing">
      <img src="./img/logo.png" id="logo" alt="redberry logo" />
      <img src="./img/landing.png" id="landingImg" alt="landing" />
      <div id="buttons">
        <Link to="addrecord">
          <button className="landingBtns">ჩანაწერის დამატება</button>
        </Link>
        <Link to="records">
          <button className="landingBtns">ჩანაწერების სია</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
