// QRCodeReader.js
import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

const QRCodeReader = () => {
  const [result, setResult] = useState(null);

  const handleScan = (data) => {
    if (data) {
      // Realize uma chamada à API para verificar se a sala está em uso usando 'data' (studentId)
      // Atualize o estado 'result' com o resultado da chamada à API
      checkRoomStatus(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const checkRoomStatus = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:3002/room/status/${studentId}`);
      const data = await response.json();

      if (response.ok) {
        // Lógica para lidar com o status da sala (data)
        console.log('Status da Sala:', data.status);
        setResult(data.status);
      } else {
        console.error('Erro ao verificar o status da sala:', data.error);
      }
    } catch (error) {
      console.error('Erro na requisição:', error.message);
    }
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <p>{result}</p>
    </div>
  );
};

export default QRCodeReader;
