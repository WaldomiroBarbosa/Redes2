import React, { useState, useEffect } from 'react';
import Axios from 'axios';

// Componente da página de formação de grupos
export const Grupo = () => {
  const [matricula, setBuscaMat] = useState('');
  const [grupo, setGrupo] = useState(['Usuário Atual']);
  const [usuariosNoGrupo, setUsuariosNoGrupo] = useState(1);

  // Efeito para carregar o usuário atual do localStorage
  useEffect(() => {
    const usuarioAtual = localStorage.getItem('usuarioAtual');
    if (usuarioAtual) {
      setGrupo([usuarioAtual]);
    }
  }, []);

  const adicionarMembro = () => {
    // Lógica para verificar a existência do usuário com a matrícula
    // Aqui você pode implementar a lógica de busca no banco de dados ou onde você armazena os usuários
    const usuarioEncontrado = buscarUsuarioPorMatricula(matricula);

    if (usuarioEncontrado) {
      // Adiciona o usuário ao grupo
      setGrupo([...grupo, usuarioEncontrado]);
      setUsuariosNoGrupo(grupo.length + 1); // Atualiza o contador
      setBuscaMat(''); // Limpa o campo de matrícula
    } else {
      alert('Usuário não encontrado!');
    }
  };

  const buscarUsuarioPorMatricula = async (matricula) => {
    try {
        const response = await Axios.get(`http://localhost:3002/buscar-usuario/${matricula}`);
        return response.data.nome;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return null;
    }
};

  return (
    <div className="formar-grupos-page">
      <h1 style={{ textAlign: 'center' }}>Formar Grupos</h1>
      <div className="container">
        <label style={{ display: 'block', textAlign: 'center' }}>Adicionar novo membro</label>
        <input
          type="number"
          value={matricula}
          onChange={(e) => setBuscaMat(e.target.value)}
          placeholder="Insira a matrícula"
          style={{ display: 'block', margin: '10px auto', textAlign: 'center' }}
        />
        <button onClick={adicionarMembro} style={{ display: 'block', margin: '10px auto' }}>
          Adicionar ao Grupo
        </button>
        <p style={{ textAlign: 'center' }}>Número de Usuários no Grupo: {usuariosNoGrupo}</p>
      </div>
    </div>
  );
};

export default Grupo;