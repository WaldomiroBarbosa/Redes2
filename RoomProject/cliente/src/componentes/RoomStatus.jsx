// RoomStatus.js
import React, { useState, useEffect } from 'react';

export const RoomStatus = () => {
  const [roomStatus, setRoomStatus] = useState('reserved');
  const studentId = '12345'; // Substitua pelo ID do estudante real

  useEffect(() => {
    const timer = setTimeout(() => {
      markRoomAsFree(studentId);
    }, 10 * 60 * 1000); // 10 minutos em milissegundos

    return () => clearTimeout(timer);
  }, [studentId]);

  const markRoomAsFree = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:3002/room/free/${studentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Sala marcada como liberada:', data.message);
        setRoomStatus('free');
      } else {
        console.error('Erro ao marcar a sala como liberada:', data.error);
      }
    } catch (error) {
      console.error('Erro na requisição:', error.message);
    }
  };

  return (
    <div>
      <p>Room Status: {roomStatus}</p>
    </div>
  );
};

export default RoomStatus;
