import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './components/Landing';
import AddUserInfo from './components/AddUserInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/addrecord/user" element={<AddUserInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
