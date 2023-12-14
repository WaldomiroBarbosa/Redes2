import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

export const Register = () => {
  const [matricula, setMat] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const createUser = (e) => {
    e.preventDefault(); // Evita o comportamento padrão de envio do formulário
    Axios.post('http://localhost:3002/register', {
      StudentId: matricula,
      Password: senha,
      Name: nome,
      Email: email,
    }).then(() => {
      console.log('User has been created');
    });
  };

  return (
    <div className="auth-form-container">
      <form className="register-form" onSubmit={createUser}>
        <label htmlFor="nome">Nome Completo</label>
        <input
          value={nome}
          type="text" 
          name="nome"
          id="nome"
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome Sobrenome"
        />

        <label htmlFor="matricula">Matrícula</label>
        <input
          value={matricula}
          type="number"
          name="matricula"
          id="matricula"
          onChange={(e) => setMat(e.target.value)}
          placeholder="Sua matrícula..."
        />

        <label htmlFor="senha">Senha</label>
        <input
          value={senha}
          type="password"
          name="senha"
          id="senha"
          onChange={(e) => setSenha(e.target.value)}
          placeholder="********"
        />

        <label htmlFor="email">Email</label>
        <input
          value={email}
          type="e-mail"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu email aqui."
        />

        <button type="submit">Registrar</button>
      </form>
      <Link to="/" className="link-btn">
        Logar
      </Link>
    </div>
  );
};

export default Register
