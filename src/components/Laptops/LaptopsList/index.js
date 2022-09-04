import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { withToken } from '../../../services/APIServices';
import './laptops.css';
import LaptopCard from '../LaptopCard';
import LaptopHeader from '../LaptopHeader';

const LaptopsList = () => {
  const [laptopsList, setLaptopsList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await withToken(
        'GET',
        'laptops',
        '7bbb011efcb959c1a848307bcc39a10e'
      );

      setLaptopsList(response.data);
    };

    getData();
  }, []);

  const laptops = laptopsList.map((element) => {
    return (
      <LaptopCard
        key={element.laptop.id}
        laptop={element.laptop}
        user={element.user}
        id={element.laptop.id}
      />
    );
  });

  return (
    <div id="allLaptops">
      <Link to="/">
        <FaArrowLeft id="backButton" />
      </Link>
      <LaptopHeader text="ჩანაწერების სია" />
      <>{laptops}</>
    </div>
  );
};

export default LaptopsList;
