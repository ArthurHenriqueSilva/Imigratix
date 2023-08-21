import React from 'react';
import '../styles/Login.css';
import logo from '../assets/logo.png';
import '@fortawesome/fontawesome-free/css/all.css';

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      const response = await fetch('http://localhost:80/api/auth/google/login');
      console.log(response);
      const data = await response.json();

      if (data.success) {
        window.location.href = '/Home';
      }
    } catch (error) {
      console.error('Erro ao autenticar com o Google:', error);
    }
  };

  const handleFacebookLogin = async () => {
    console.log('Autenticando com Facebook...');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img className="logo" src={logo} alt="Logo"></img>
        <h1 className="faca-login">Faça login</h1>
        <div className="login-buttons">
          <button onClick={handleGoogleLogin} className="google-button">
            <i className="fab fa-google"></i> Logar com Google
          </button>
          <button onClick={handleFacebookLogin} className="facebook-button">
            <i className="fab fa-facebook"></i> Logar com Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
