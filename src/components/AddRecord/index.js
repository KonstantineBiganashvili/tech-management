import React, { useState } from 'react';
import AddUSerInfo from './AddUserInfo';

const AddRecord = () => {
  const [enteredUserInfo, setEnteredUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')) || {}
  );

  return (
    <>
      <AddUSerInfo
        enteredInfo={enteredUserInfo}
        setEnteredInfo={setEnteredUserInfo}
      />
    </>
  );
};

export default AddRecord;
