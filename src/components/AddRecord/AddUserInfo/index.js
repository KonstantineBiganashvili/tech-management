import React, { useEffect, useState } from 'react';
import './AddUserInfo.css';
import { withOutBody } from '../../../services/APIServices';

const AddUserInfo = () => {
  const [enteredInfo, setEnteredInfo] = useState({});
  const [teams, setTeams] = useState([]);
  const [positions, setPosition] = useState([]);

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

  return (
    <div id="addUserInfo">
      <div id="header">
        <h2>თანამშრომლის ინფო</h2>
        <h2>ლეპტოპის მახასიათებლები</h2>
      </div>
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
                  name: e.target.value,
                }));
              }}
            />
            <p className="additionalInfo">მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
          </div>
          <div className="inputGroup">
            <label htmlFor="surnameInputField">თანამშრომლის სახელი:</label>
            <input
              type="text"
              id="surnameInputField"
              onInput={(e) => {
                setEnteredInfo((oldInfo) => ({
                  ...oldInfo,
                  surname: e.target.value,
                }));
              }}
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
          >
            <option value="" selected disabled hidden>
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
          >
            <option value="" selected disabled hidden>
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
                  mail: e.target.value,
                }));
              }}
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
                  number: e.target.value,
                }));
              }}
            />
            <p className="additionalInfo">
              უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს
            </p>
          </div>
        </div>
        <button id="nextButton">შემდეგი</button>
      </div>
      <img src="./img/logo-round.png" alt="redberry round logo" />
    </div>
  );
};

export default AddUserInfo;
