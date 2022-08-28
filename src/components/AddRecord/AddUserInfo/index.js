import React, { useEffect, useInsertionEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddUserInfo.css';
import { FaArrowLeft } from 'react-icons/fa';
import { withOutBody } from '../../../services/APIServices';
import { checkAlphabet } from '../../../services/LanguageCheck';
import { validMail } from '../../../services/ValidMail';
import { validNumber } from '../../../services/ValidNumber';
import Header from '../Header';
import Errors from '../../Errors';

const AddUserInfo = (props) => {
  const { enteredInfo, setEnteredInfo } = props;
  const [teams, setTeams] = useState([]);
  const [positions, setPosition] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const teamsList = async () => {
      const teamsData = await withOutBody('GET', 'teams');

      setTeams(teamsData.data);
    };

    const positionsList = async () => {
      const positionsData = await withOutBody('GET', 'positions');

      setPosition(positionsData.data);
    };

    teamsList();
    positionsList();
  }, []);

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(enteredInfo));
    setErrors([]);
  }, [enteredInfo]);

  const teamsOptions = teams.map((element) => {
    return (
      <option key={element.id} id={element.id}>
        {element.name}
      </option>
    );
  });

  const postionsOptions = positions.map((element) => {
    const currentTeam = teams.filter((element) => {
      if (element.name === enteredInfo.team) return true;
      return false;
    });

    if (currentTeam.length && currentTeam[0].id === element.team_id) {
      return <option key={element.id}>{element.name}</option>;
    }

    return null;
  });

  const nextPage = () => {
    const errorsArray = [];

    if (
      !enteredInfo.name ||
      !enteredInfo.surname ||
      !enteredInfo.team ||
      !enteredInfo.position ||
      !enteredInfo.mail ||
      !enteredInfo.number
    ) {
      errorsArray.push('აუცილებელია ყოველი ველის შევსება!');
    }

    if (enteredInfo.name) {
      if (!enteredInfo.name.trim()) {
        errorsArray.push('სახელი არ უნდა იყოს ცარიელი');
      }

      if (checkAlphabet(enteredInfo.name) > 0) {
        errorsArray.push('სახელი უნდა შეიცავდეს მხოლოდ ქართულ ასოებს');
      }

      if (!enteredInfo.name > 2) {
        errorsArray.push('სახელი არ უნდა იყოს 2 ასოზე ნაკლები');
      }
    }

    if (enteredInfo.surname) {
      if (!enteredInfo.surname.trim()) {
        errorsArray.push('გვარი არ უნდა იყოს ცარიელი');
      }

      if (checkAlphabet(enteredInfo.surname) > 0) {
        errorsArray.push('გვარი უნდა შეიცავდეს მხოლოდ ქართულ ასოებს');
      }

      if (!enteredInfo.surname > 2) {
        errorsArray.push('გვარი არ უნდა იყოს 2 ასოზე ნაკლები');
      }
    }

    if (enteredInfo.number) {
      console.log(enteredInfo.number.length);
      if (!String(enteredInfo.number).trim()) {
        errorsArray.push('მობილურის ნომერი არ უნდა იყოს ცარიელი');
      }

      if (
        !validNumber(String(enteredInfo.number)) ||
        enteredInfo.number.length !== 12
      ) {
        errorsArray.push(
          'მობილურის ნომერი უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს'
        );
      }
    }

    if (enteredInfo.mail) {
      if (!enteredInfo.mail.trim()) {
        errorsArray.push('მეილი არ უნდა იყოს ცარიელი');
      }

      if (!validMail(enteredInfo.mail.toLowerCase())) {
        errorsArray.push('მეილი უნდა მთავრდებოდეს @redberry.com-ით');
      }
    }

    if (errorsArray.length) {
      return setErrors(errorsArray);
    }

    return navigate('../addrecords/specs');
  };

  return (
    <div id="addUserInfo">
      <Link to="/">
        <FaArrowLeft id="backButton" />
      </Link>

      <Header activeEmployees={true} activeSpecs={false} />
      <div className="inputFields">
        <ul>{errors.length ? <Errors errors={errors} /> : null}</ul>
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
            <p className="additionalInfo">მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
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
            <p className="additionalInfo">მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
          </div>
        </div>
        <div id="selects">
          <select
            className="selectOptions"
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
          <select
            disabled={enteredInfo.team ? false : true}
            className="selectOptions"
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
            <p className="additionalInfo">უნდა მთავრდებოდეს @redberry.com-ით</p>
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
            <p className="additionalInfo">
              უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს
            </p>
          </div>
        </div>
        <button className="nextButton" onClick={nextPage}>
          შემდეგი
        </button>
      </div>
      <img src="./img/logo-round.png" alt="redberry round logo" />
    </div>
  );
};

export default AddUserInfo;
