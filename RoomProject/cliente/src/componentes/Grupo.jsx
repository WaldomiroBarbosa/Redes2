import React, { useState, useEffect } from 'react';
import Axios from 'axios';

// Componente da página de formação de grupos
export const Grupo = () => {
  const [matricula, setBuscaMat] = useState('');
  const [grupo, setGrupo] = useState(['Usuário Atual']);
  const [usuariosNoGrupo, setUsuariosNoGrupo] = useState(1);

  // Efeito para carregar o usuário atual do localStorage
  useEffect(() => {
    const carregarUsuarioAtual = async () => {
      const usuarioAtual = await localStorage.getItem('usuarioAtual');
      if (usuarioAtual) {
        setGrupo([usuarioAtual]);
      }
    };
  
    carregarUsuarioAtual();
  }, []);
  const adicionarMembro = async () => {
    try {
      const usuarioEncontrado = await buscarUsuarioPorMatricula(matricula);
  
      if (usuarioEncontrado) {
        // Verifica se o usuário já está no grupo
        if (!grupo.includes(usuarioEncontrado)) {
          // Verifica se o grupo já atingiu o limite de membros
          if (grupo.length < 8) {
            // Adiciona o usuário ao grupo no estado
            setGrupo((prevGrupo) => [...prevGrupo, usuarioEncontrado]);
            // Atualiza o contador de usuários no grupo
            setUsuariosNoGrupo((prevCount) => prevCount + 1);
  
            const response = await Axios.post(`http://localhost:3002/adicionar-usuario-ao-grupo/${matricula}`);
            console.log(response.data.message); // Exibe a mensagem do backend
  
            // Limpa o campo de matrícula
            setBuscaMat('');
          } else {
            alert('O grupo já atingiu o limite de membros.');
          }
        } else {
          alert('Usuário já está no grupo.');
        }
      } else {
        alert('Usuário não encontrado no banco de dados!');
      }
    } catch (error) {
      console.error('Erro ao adicionar membro:', error);
      alert('Erro ao adicionar membro. Verifique o console para mais detalhes.');
    }
  };

  const buscarUsuarioPorMatricula = async (studentId) => {
    try {
        const response = await Axios.get(`http://localhost:3002/buscar-usuario/${studentId}`);
        console.log('found it!!')
        return response.data.studentId;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return null;
    }
};

  return (
    <div className="formar-grupos-page">
      <h1 style={{ textAlign: 'center' }}>Formar Grupos</h1>
      <div className="auth-form-container">
        <label style={{ display: 'block', textAlign: 'center' }}>Adicionar novo membro</label>
        <input
          type="number"
          value={matricula}
          onChange={(e) => setBuscaMat(e.target.value)}
          placeholder="Insira a matrícula"
          style={{ display: 'block', margin: '10px auto', textAlign: 'center' }}
        />
        <button type="submit" onClick={adicionarMembro} style={{ display: 'block', margin: '10px auto' }}>
          Adicionar ao Grupo
        </button>
        <p style={{ textAlign: 'center' }}>Número de Usuários no Grupo: {usuariosNoGrupo}</p>
      </div>
    </div>
  );
};

export default Grupo;