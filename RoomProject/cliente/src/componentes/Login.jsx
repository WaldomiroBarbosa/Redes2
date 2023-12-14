import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios';

export const Login = ( ) => {
  const [loginMatricula, setLoginMat] = useState('');
  const [loginSenha, setLoginSenha] = useState('');
  const navigateTo = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3002/login', {

      LoginStudentId: loginMatricula,
      LoginPassword: loginSenha,
    }).then((response) => {
      console.log('onLogin type:', typeof onLogin);
      if (response.data.length > 0) {
        localStorage.setItem('user', JSON.stringify(response.data[0]));
        navigateTo('/home');
      } else {
        navigateTo('/');
      }
    });
  };

  return (
    <div className="auth-form-container">
    <form className="login-form" onSubmit={loginUser}>
      <span className="sucess-span">Status</span>

      <label htmlFor="matricula">Matrícula</label>
      <input
        value={loginMatricula}
        type="number"
        onChange={(e) => setLoginMat(e.target.value)} // Corrigido aqui
        placeholder="Sua matrícula..."
        id="matricula"
        name="matricula"
      />

      <label htmlFor="senha">Senha</label>
      <input
        value={loginSenha}
        onChange={(e) => setLoginSenha(e.target.value)}
        type="password"
        placeholder="********"
        id="senha"
        name="senha"
      />
      <button type="submit">Acessar</button>
    </form>

    <Link to="/register" className="link-btn">
      Registrar
    </Link>
  </div>
  );
};

export default Login