// src/components/AppointmentNotification.js

import React from 'react';
import ApiHandler from '../../api_handler';
import SearchImage from '../../SearchImage';

const AppointmentNotification = ({ model, update }) => {
  const imageUrl = SearchImage({ folder: 'Establishment' }).getImage(model.bussinessDetails.profileImage);

  return (
    <div className="card">
      <div className="card-content">
        <div className="card-header">
          <i className="icon-notification-important"></i>
          <h3>¡Ya es tu turno!</h3>
          <p>{model.bussinessDetails.bussinessName}</p>
        </div>
        <img src={imageUrl} alt="Bussiness" />
        <div className="card-actions">
          <button onClick={() => { /* handle cancel */ }}>Cancelar</button>
          <button onClick={() => { /* handle confirm */ }}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentNotification;
