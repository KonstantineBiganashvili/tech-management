import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './components/Landing';
import AddUserInfo from './components/AddUserInfo';
import AddSpecs from './components/AddSpecs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/addrecord/employee" element={<AddUserInfo />} />
        <Route path="/addrecord/specs" element={<AddSpecs />} />
      </Routes>
    </Router>
  );
}

export default App;
