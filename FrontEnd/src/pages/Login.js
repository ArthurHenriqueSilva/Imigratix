import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import "../styles/Login.css";
import { useUserContext } from "../components/UserContext";
import logo from "../assets/logo.png";
import "@fortawesome/fontawesome-free/css/all.css";

const Login = () => {
  const [loginResult, setLoginResult] = useState(null);
  const navigate = useNavigate();
  const { updateUser } = useUserContext();

  const handleLogin = (event) => {
    event.preventDefault();
    const login = event.target.login.value;
    const password = event.target.password.value;
    const formData = new URLSearchParams();
    formData.append("login", login);
    formData.append("password", password);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    };

    fetch("http://localhost:80/api/login", requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro na solicitação");
        }
        return res.json();
      })
      .then((data) => {
        setLoginResult(data);
        console.log(data);

        if (data.result === true) {
          updateUser(login);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoginResult({ result: "false", status: "500" });
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img className="logo" src={logo} alt="Logo" />
        <h1 className="faca-login">Faça login</h1>
        <div className="login-form">
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Nome de usuário" name="login" />
            <input type="password" placeholder="Senha" name="password" />
            <button className="local-login-button">Entrar</button>
            <Link to="/Sign" className="links-login">
              Não possui Cadastro ?
            </Link>
            <Link to="/" className="links-login">
              Voltar para a página inicial
            </Link>
          </form>
          {loginResult && (
            <p className={loginResult.result === true ? "success" : "error"}>
              {loginResult.result === true
                ? "Login bem sucedido!"
                : "Erro ao fazer login. Por favor, verifique suas credenciais."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
