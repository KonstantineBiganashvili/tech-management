import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LaptopHeader from '../LaptopHeader';
import './laptop.css';
import { FaArrowLeft } from 'react-icons/fa';
import { withToken, withOutToken } from '../../../services/APIServices';

const Laptop = () => {
  let { id } = useParams();

  const [laptop, setLaptop] = useState({
    user: {
      email: '',
      name: '',
      phone_number: '',
      position_id: '',
      surname: '',
      team_id: '',
    },
    laptop: {
      brand_id: '',
      cpu: { name: '', cores: '', threads: '' },
      hard_drive_type: '',
      image: '',
      name: '',
      price: '',
      purchase_date: '',
      ram: '',
      state: '',
    },
  });
  const [team, setTeam] = useState('');
  const [position, setPosition] = useState('');
  const [brand, setBrand] = useState('');

  useEffect(() => {
    const getData = async () => {
      const response = await withToken(
        'GET',
        'laptop',
        '7bbb011efcb959c1a848307bcc39a10e',
        id
      );

      setLaptop(response.data);
    };

    getData();
  }, []);

  useEffect(() => {
    const teamsList = async () => {
      const teamsData = await withOutToken('GET', 'teams');

      const correctTeam = await teamsData.data.filter(
        (team) => team.id === laptop.user.team_id
      );

      setTeam(correctTeam[0].name);
    };

    const positionsList = async () => {
      const positionsData = await withOutToken('GET', 'positions');

      const correctPosition = await positionsData.data.filter(
        (position) => position.id === laptop.user.position_id
      );

      setPosition(correctPosition[0].name);
    };

    const brandsList = async () => {
      const brandsData = await withOutToken('GET', 'brands');

      const brandName = await brandsData.data.filter((brand) => {
        return brand.id === laptop.laptop.brand_id;
      });

      setBrand(brandName[0].name);
    };

    brandsList();
    teamsList();
    positionsList();
  }, [laptop]);

  return (
    <div id="laptopContainer">
      <Link to="/">
        <FaArrowLeft id="backButton" />
      </Link>
      <LaptopHeader text="ლეპტოპის ინფო" />
      <div id="userInformation">
        <img
          src={`https://pcfy.redberryinternship.ge${laptop.laptop.image}`}
          alt="laptop"
          id="laptopImg"
        />

        <table id="userInfoTable">
          <tbody>
            <tr>
              <td>
                <strong>სახელი:</strong>
              </td>
              <td>
                {laptop.user.name} {laptop.user.surname}
              </td>
            </tr>
            <tr>
              <td>
                <strong>თიმი:</strong>
              </td>
              <td>{team}</td>
            </tr>
            <tr>
              <td>
                <strong>პოზიცია:</strong>
              </td>
              <td>{position}</td>
            </tr>
            <tr>
              <td>
                <strong>მეილი:</strong>
              </td>
              <td>{laptop.user.email}</td>
            </tr>
            <tr>
              <td>
                <strong>ტელ. ნომერი:</strong>
              </td>
              <td>{laptop.user.phone_number}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
      <div id="laptopInfo">
        <table className="laptopInfoTable">
          <tbody>
            <tr>
              <td>
                <strong>ლეპტოპის სახელი:</strong>
              </td>
              <td>{laptop.laptop.name}</td>
            </tr>
            <tr>
              <td>
                <strong>ლეპტოპის ბრენდი:</strong>
              </td>
              <td>{brand}</td>
            </tr>
            <tr>
              <td>
                <strong>RAM:</strong>
              </td>
              <td>{laptop.laptop.ram}</td>
            </tr>
            <tr>
              <td>
                <strong>მეხსიერების ტიპი:</strong>
              </td>
              <td>{laptop.laptop.hard_drive_type}</td>
            </tr>
          </tbody>
        </table>
        <table className="laptopInfoTable">
          <tbody>
            <tr>
              <td>
                <strong>CPU:</strong>
              </td>
              <td>{laptop.laptop.cpu.name}</td>
            </tr>
            <tr>
              <td>
                <strong>CPU-ს ბირთვი:</strong>
              </td>
              <td>{laptop.laptop.cpu.cores}</td>
            </tr>
            <tr>
              <td>
                <strong>CPU-ს ნაკადი:</strong>
              </td>
              <td>{laptop.laptop.cpu.threads}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
      <div id="additionalInfo">
        <table className="laptopInfoTable">
          <tbody>
            <tr>
              <td>
                <strong>ლეპტოპის მდგომარეობა:</strong>
              </td>
              <td>{laptop.laptop.state}</td>
            </tr>
            <tr>
              <td>
                <strong>ლეპტოპსი ფასი:</strong>
              </td>
              <td>{laptop.laptop.price} ₾</td>
            </tr>
          </tbody>
        </table>
        <table className="laptopInfoTable">
          <tbody>
            <tr>
              <td>
                <strong>შეძენის რიცხვი:</strong>
              </td>
              <td>{laptop.laptop.purchase_date}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Laptop;
