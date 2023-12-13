// ReservationDetailsPage.js
import React from 'react';
import QRCode from 'qrcode.react';

const ReservationDetailsPage = ({ reservationData }) => {
  // Assume que `reservationData` contém informações da reserva, incluindo um ID único
  const reservationId = reservationData.id;

  return (
    <div>
      <h2>Detalhes da Reserva da Sala</h2>
      <p>Informações da reserva...</p>
      
      {/* Componente que gera o QR code com o ID da reserva */}
      <QRCode value={reservationId} />

      <p>ID da Reserva: {reservationId}</p>
    </div>
  );
};

export default ReservationDetailsPage;
