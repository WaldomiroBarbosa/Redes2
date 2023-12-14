import React, { useState, useEffect } from 'react';

export const Home = ( ) => {

  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Buscar o nome do usuário armazenado localmente
    const storedUserName = localStorage.getItem('user');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div className="home-container">
      <h1>Bem-vindo, {userName}</h1>
      <div className="form-container">
        <form>
          <div className="form-item">
            <label htmlFor="select1">Precisa de lousa?</label>
          </div>
          <div>
            <select id="select1" name="select1" placeholder='Escolher'>
              <option value="opcao1">Sim</option>
              <option value="opcao2">Não</option>
            </select>
          </div>
          

          <div className="form-item">
            <label htmlFor="select2">Precisa de computador?</label>
          </div>
          <div>
            <select id="select2" name="select2" placeholder='Escolher'>
              
              
              <option value="opcao1">Sim</option>
              <option value="opcao2">Não</option>
            </select>
          </div>

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Home;