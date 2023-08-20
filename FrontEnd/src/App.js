import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Table from './pages/Table';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/Tabela" element={<Table />} />
      </Routes>
    </Router>
  );
};

export default App;
