import React from "react";
import frames from "./components";
import logo from "../assets/logo.png";
const Dashboard = () => {
  return (
    <div className="container">
      <div className="form-frames">
        <frames.Frame1 />
      </div>

      <div className="form-frames">
        <frames.Frame2 />
      </div>

      <div className="form-frames">
        <frames.Frame3 />
      </div>

      <div className="form-frames">
        <frames.Frame4 />
      </div>

      <div className="form-frames">
        <frames.Frame5 />
      </div>

      <div className="form-frames">
        <frames.Frame6 />
      </div>

      <div className="form-frames">
        <frames.Frame7 />
      </div>

      <div className="form-frames">
        <frames.Frame8 />
      </div>

      <div className="form-frames">
        <frames.Frame9 />
      </div>

      <div className="form-frames">
        <frames.Frame10 />
      </div>
      <div className="form-frames-2">
        <img src={logo} alt="IMIGRATIX" className="centered-image" />
      </div>
    </div>
  );
};

export default Dashboard;
