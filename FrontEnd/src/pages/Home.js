import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import AppSummary from "../components/AppSummary";
import Login from "./Login";
import logo from "../assets/logo.png";

const Home = () => {
  return (
    <div>
      <header className="header">
        <img className="logo" src={logo} alt="Logo" />
        <Link to="/login" className="login-button">
          Login
        </Link>
      </header>
      <div className="content">
        <AppSummary />
        <div className="dashboard">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
