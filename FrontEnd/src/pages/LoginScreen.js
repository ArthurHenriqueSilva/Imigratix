import React, { useState, useContext } from "react";
import "../styles/Login.css";
import logo from "../assets/logo.png";
import "@fontawesome/fontawesome-free/css/all.css";
import { GoogleLogin } from "react-google-login";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const clientId =
  "396440993080-c1jfpn4l4gqtijk14h4u449euvimt8u4.apps.googleusercontent.com";

const LoginScreen = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [profilePic, setProfilePic] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ip, setIp] = useState();
  const [country, setCountry] = useState();

  const responseGoogle = (response) => {
    console.log(response.profileObj);
    const {
      profileObj: { name, email, imageUrl },
    } = response;
    setName(name);
    setEmail(email);
    setProfilePic(imageUrl);
    setIsLoggedIn(true);

    fetch("http://ip-api.com/json/")
      .then((res) => {
        if (res.status === 200) {
          return res.json(); // Obtém os dados do JSON aqui
        } else {
          throw new Error("Failed to fetch");
        }
      })
      .then((data) => {
        const { query, country } = data; // Acessa os dados corretamente
        setIp(query);
        setCountry(country);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img className="logo" src={logo} alt="Logo"></img>
        <h1 className="faca-login">Faça login</h1>
        <div className="login-buttons">
          <div id="signButtonGoogle">
            <GoogleLogin
              clientId={clientId}
              buttonText="Continuar com o Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
            {isLoggedIn ? (
              <div style={{ textAlign: "center" }}>
                <h1>User Information</h1>
                <img className="profile" src={profilePic} alt="Profile" />
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>ip: {ip}</p>
                <p>País: {country}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
