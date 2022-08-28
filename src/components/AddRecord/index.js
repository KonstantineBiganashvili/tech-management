import React, { useState } from 'react';
import AddUSerInfo from './AddUserInfo';

const AddRecord = () => {
  const [showModal, setShowModal] = useState(false);

  const [enteredInfo, setEnteredInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')) || {}
  );

  return (
    <>
      <AddUSerInfo
        enteredInfo={enteredInfo}
        setEnteredInfo={setEnteredInfo}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default AddRecord;
