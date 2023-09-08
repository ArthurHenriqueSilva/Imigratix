import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import AppSummary from "../components/AppSummary";
import Login from "./Login";
import { useUserContext } from "../components/UserContext";
import logo from "../assets/logo.png";
import "../styles/style.css";

const Home = () => {
  const { userName } = useUserContext();
  return (
    <div>
      <header className="header">
        <img className="logo" src={logo} alt="Logo" />
        <div className="HiUser">
          {userName ? <h2>Olá, {userName}</h2> : <h2>Olá, Visitante.</h2>}
        </div>
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
