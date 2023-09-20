import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import logo from "../assets/logo.png";
import { useUserContext } from "../components/UserContext"; // Importe useUserContext

const Sign = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registrationResult, setRegistrationResult] = useState(null);
  const navigate = useNavigate();
  const { updateUser } = useUserContext(); // Obtenha o método updateUser do contexto

  const handleRegistration = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: username, password }),
    };

    try {
      const response = await fetch(
        "http://localhost:80/api/insert-user",
        requestOptions
      );
      const data = await response.json();
      setRegistrationResult(data);
      console.log(data);

      if (data.status === 201) {
        updateUser(username);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setRegistrationResult({ status: "500" });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img className="logo" src={logo} alt="Logo"></img>
        <h1 className="faca-login">Seja bem vindo</h1>
        <div className="login-form">
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegistration} className="local-login-button">
            Cadastrar-se
          </button>
          {registrationResult && (
            <p
              className={
                registrationResult.status === 201 ? "success" : "error"
              }
            >
              {registrationResult.status === 201
                ? "Cadastro realizado com sucesso!"
                : "Erro ao cadastrar. Por favor, verifique suas informações."}
            </p>
          )}
          <Link to="/login" className="links-login">
            Já possui Cadastro ?
          </Link>
          <Link to="/" className="links-login">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sign;
