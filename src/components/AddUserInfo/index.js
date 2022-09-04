import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './addUserInfo.css';
import { FaArrowLeft } from 'react-icons/fa';
import { withOutToken } from '../../services/APIServices';
import {
  checkAlphabet,
  validMail,
  validNumber,
} from '../../helpers/validators';

import Header from '../Header';
import Select from '../Select';

const AddUserInfo = (props) => {
  const [enteredInfo, setEnteredInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')) || {}
  );

  const [teams, setTeams] = useState([]);
  const [positions, setPosition] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const teamsList = async () => {
      const teamsData = await withOutToken('GET', 'teams');

      setTeams(teamsData.data);
    };

    const positionsList = async () => {
      const positionsData = await withOutToken('GET', 'positions');

      setPosition(positionsData.data);
    };

    teamsList();
    positionsList();
  }, []);

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(enteredInfo));
    setErrors({});
  }, [enteredInfo]);

  const teamsOptions = teams.map((element) => {
    return (
      <Select key={element.id} id={element.id} selectName={element.name} />
    );
  });

  const postionsOptions = positions.map((element) => {
    const currentTeam = teams.filter((element) => {
      if (element.name === enteredInfo.team) return true;
      return false;
    });

    if (currentTeam.length && currentTeam[0].id === element.team_id) {
      return (
        <Select key={element.id} id={element.id} selectName={element.name} />
      );
    }

    return null;
  });

  const nextPage = () => {
    const errorsObject = {};

    if (!enteredInfo.name || !enteredInfo.name.trim()) {
      errorsObject.nameError = 'სახელი არ უნდა იყოს ცარიელი';
    }
    if (enteredInfo.name) {
      if (!enteredInfo.name > 2) {
        errorsObject.nameError = 'სახელი არ უნდა იყოს 2 ასოზე ნაკლები';
      }

      if (checkAlphabet(enteredInfo.name) > 0) {
        errorsObject.nameError = 'სახელი უნდა შეიცავდეს მხოლოდ ქართულ ასოებს';
      }
    }

    if (!enteredInfo.surname || !enteredInfo.surname.trim()) {
      errorsObject.surnameError = 'გვარი არ უნდა იყოს ცარიელი';
    }
    if (enteredInfo.surname) {
      if (!enteredInfo.surname > 2) {
        errorsObject.surnameError = 'გვარი არ უნდა იყოს 2 ასოზე ნაკლები';
      }

      if (checkAlphabet(enteredInfo.surname) > 0) {
        errorsObject.surnameError = 'გვარი უნდა შეიცავდეს მხოლოდ ქართულ ასოებს';
      }
    }

    if (!enteredInfo.team) {
      errorsObject.teamError = 'აირჩიეთ გუნდი';
    }

    if (!enteredInfo.position) {
      errorsObject.positionError = 'აირჩიეთ პოზიცია';
    }

    if (!enteredInfo.number || !String(enteredInfo.number).trim()) {
      errorsObject.numberError = 'მობილურის ნომერი არ უნდა იყოს ცარიელი';
    }

    if (enteredInfo.number) {
      if (
        !validNumber(String(enteredInfo.number)) ||
        enteredInfo.number.length !== 12
      ) {
        errorsObject.numberError =
          'მობილურის ნომერი უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს';
      }
    }

    if (!enteredInfo.mail || !enteredInfo.mail.trim()) {
      errorsObject.mailError = 'მეილი არ უნდა იყოს ცარიელი';
    }

    if (enteredInfo.mail) {
      if (!validMail(enteredInfo.mail.toLowerCase())) {
        errorsObject.mailError = 'მეილი უნდა მთავრდებოდეს @redberry.com-ით';
      }
    }

    if (Object.keys(errorsObject).length) {
      return setErrors(errorsObject);
    }

    return navigate('../addrecord/specs');
  };

  return (
    <div id="addUserInfo">
      <Link to="/">
        <FaArrowLeft id="backButton" />
      </Link>

      <Header activeEmployees={true} activeSpecs={false} />
      <div className="inputFields">
        <div className="textInputs">
          <div className="inputGroup">
            <label htmlFor="nameInputField">თანამშრომლის სახელი:</label>
            <input
              type="text"
              id="nameInputField"
              onInput={(e) => {
                setEnteredInfo((oldInfo) => ({
                  ...oldInfo,
                  name: e.target.value.toLowerCase(),
                }));
              }}
              value={enteredInfo.name || ''}
            />
            {errors.nameError ? (
              <p className="errorText">{errors.nameError}</p>
            ) : (
              <p className="additionalInfo">
                მინიმუმ 2 სიმბოლო, ქართული ასოები
              </p>
            )}
          </div>
          <div className="inputGroup">
            <label htmlFor="surnameInputField">თანამშრომლის გვარი:</label>
            <input
              type="text"
              id="surnameInputField"
              onInput={(e) => {
                setEnteredInfo((oldInfo) => ({
                  ...oldInfo,
                  surname: e.target.value.toLowerCase(),
                }));
              }}
              value={enteredInfo.surname || ''}
            />
            {errors.surnameError ? (
              <p className="errorText">{errors.surnameError}</p>
            ) : (
              <p className="additionalInfo">
                მინიმუმ 2 სიმბოლო, ქართული ასოები
              </p>
            )}
          </div>
        </div>
        <div className="selects">
          <div className="selectOptions">
            <select
              onChange={(e) => {
                setEnteredInfo((oldInfo) => ({
                  ...oldInfo,
                  team: e.target.value,
                }));
              }}
              value={enteredInfo.team || 'team'}
            >
              <option value="team" disabled hidden>
                თიმი
              </option>
              {teamsOptions}
            </select>
            {errors.teamError ? (
              <p className="errorText">{errors.teamError}</p>
            ) : null}
          </div>
          <div className="selectOptions">
            <select
              disabled={enteredInfo.team ? false : true}
              onChange={(e) => {
                setEnteredInfo((oldInfo) => ({
                  ...oldInfo,
                  position: e.target.value,
                }));
              }}
              value={enteredInfo.position || 'position'}
            >
              <option value="position" disabled hidden>
                პოზიცია
              </option>

              {postionsOptions}
            </select>
            {errors.positionError ? (
              <p className="errorText">{errors.positionError}</p>
            ) : null}
          </div>
        </div>
        <div className="textInputs textInputs-2">
          <div className="inputGroup inputGroup-2">
            <label htmlFor="emailInputField">მეილი:</label>
            <input
              type="email"
              id="emailInputField"
              onInput={(e) => {
                setEnteredInfo((oldInfo) => ({
                  ...oldInfo,
                  mail: e.target.value.toLowerCase(),
                }));
              }}
              value={enteredInfo.mail || ''}
            />
            {errors.mailError ? (
              <p className="errorText">{errors.mailError}</p>
            ) : (
              <p className="additionalInfo">
                უნდა მთავრდებოდეს @redberry.com-ით
              </p>
            )}
          </div>
          <div className="inputGroup inputGroup-2">
            <label htmlFor="numberInputField">ტელეფონის ნომერი:</label>
            <input
              type="number"
              id="numberInputField"
              onInput={(e) => {
                setEnteredInfo((oldInfo) => ({
                  ...oldInfo,
                  number: e.target.value.toLowerCase(),
                }));
              }}
              value={enteredInfo.number || 995}
            />
            {errors.numberError ? (
              <p className="errorText">{errors.numberError}</p>
            ) : (
              <p className="additionalInfo">
                უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს
              </p>
            )}
          </div>
        </div>
        <button className="nextButton" onClick={nextPage}>
          შემდეგი
        </button>
      </div>
      <img src="/img/logo-round.png" alt="redberry round logo" />
    </div>
  );
};

export default AddUserInfo;
