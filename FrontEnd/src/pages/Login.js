import React from 'react';
import '../styles/Login.css';
import logo from '../assets/logo.png';
import '@fortawesome/fontawesome-free/css/all.css';

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/google');
      console.log(response);
      const data = await response.json();

      if (data.success) {
        window.location.href = '/Home';
      }
    } catch (error) {
      console.error('Erro ao autenticar com o Google:', error);
    }

    console.log('Autenticando com Google...');
  };

  const handleFacebookLogin = async () => {
    try {
      const response = await fetch('/auth/facebook');
      const data = await response.json();

      if (data.success) {
        window.location.href = '/Home';
      }
    } catch (error) {
      console.error('Erro ao autenticar com o Facebook:', error);
    }
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
