import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './components/Landing';
import AddRecord from './components/AddRecord';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/addrecord" element={<AddRecord />} />
      </Routes>
    </Router>
  );
}

export default App;
