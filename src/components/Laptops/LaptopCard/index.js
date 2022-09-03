import React from 'react';
import { Link } from 'react-router-dom';
import './laptopCard.css';

const LaptopCard = (props) => {
  const { laptop, user, id } = props;

  return (
    <div className="laptopCard">
      <img
        src={`https://pcfy.redberryinternship.ge/${laptop.image}`}
        alt="laptop"
        className="laptopImg"
      />
      <div className="laptopInfo">
        <div>
          <p>
            {user.name} {user.surname}
          </p>
          <p>{laptop.name}</p>
        </div>
        <Link to={`./${id}`}>მეტის ნახვა</Link>
      </div>
    </div>
  );
};

export default LaptopCard;
