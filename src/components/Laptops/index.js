import React, { useEffect, useState } from 'react';
import { withBody } from '../../services/APIServices';
import './laptops.css';
import LaptopCard from './LaptopCard';
import LaptopHeader from './LaptopHeader';

const Laptops = () => {
  const [laptopsList, setLaptopsList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await withBody('GET', 'laptops');

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
      <LaptopHeader text="ჩანაწერების სია" />
      <>{laptops}</>
    </div>
  );
};

export default Laptops;
