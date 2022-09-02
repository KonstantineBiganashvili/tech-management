import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './components/Landing';
import AddUserInfo from './components/AddUserInfo';

function App() {
  const [enteredUserInfo, setEnteredUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')) || {}
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route
          path="/addrecord/user"
          element={
            <AddUserInfo
              enteredInfo={enteredUserInfo}
              setEnteredInfo={setEnteredUserInfo}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
