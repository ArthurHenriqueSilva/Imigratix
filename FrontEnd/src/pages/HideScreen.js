import React from "react";
import AppSummary from "../components/AppSummary";
import logo from "../assets/logo.png";

const HideScreen = () => {
  return (
    <div>
      <header>
        <img className="logo" src={logo} alt="Logo"></img>
      </header>
      <div className="content">
        <AppSummary />
        <div>
          <h2>Hide Screen</h2>
        </div>
      </div>
    </div>
  );
};

export default HideScreen;
