// ConfirmationPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export const ConfirmationPage = ({ match }) => {
  const [status, setStatus] = useState('');
  const studentId = match.params.studentId;
  const history = useNavigate();

  useEffect(() => {
    // Realize uma chamada à API para verificar o status da sala usando o studentId
    const checkRoomStatus = async () => {
      try {
        const response = await fetch(`http://localhost:3002/room/status/${studentId}`);
        const data = await response.json();

        if (response.ok) {
          setStatus(data.status);
        } else {
          console.error('Erro ao verificar o status da sala:', data.error);
        }
      } catch (error) {
        console.error('Erro na requisição:', error.message);
      }
    };

    checkRoomStatus();
  }, [studentId]);

  const handleLogout = () => {

    history.push('/');
  };

  return (
    <div>
      {status === 'reserved' ? (
        <div>
          <h2>Acesso à Sala Concedido</h2>
          <p>Você é a pessoa que reservou a sala. Aproveite!</p>
          <button onClick={handleLogout}>Sair</button>
        </div>
      ) : (
        <div>
          <h2>Acesso Negado</h2>
          <p>Você não tem permissão para acessar esta sala.</p>
          <button onClick={handleLogout}>Voltar para o Login</button>
        </div>
      )}
    </div>
  );
};

export default ConfirmationPage;
