// src/components/JobApplicationNotification.js

import React, { useEffect, useState } from 'react';
import { useNotifications } from '../NotificationsProvider';
import ApiHandler from '../../api_handler';
import SearchImage from '../../SearchImage';

const JobApplicationNotification = ({ model, update }) => {
  const [bussinessDetails, setBussinessDetails] = useState(null);
  const { checkNotifications } = useNotifications('');

  useEffect(() => {
    const fetchBussinessDetails = async () => {
      const details = await ApiHandler.searchBussinessById(model.establishmentId);
      setBussinessDetails(details);
    };

    fetchBussinessDetails();
  }, [model.establishmentId]);

  const handleCancel = async () => {
    await ApiHandler.updateJobApplicationStatus({ jobAppId: model.id, roleid: model.roleId, status: 'Cancelled' });
    checkNotifications(ApiHandler.userDetails.id);
    update();
  };

  const handleAccept = async () => {
    await ApiHandler.addEmployeeToBussiness({ bussinessid: model.establishmentId, userid: model.userId });
    await ApiHandler.addRoleToEmployee({ userid: model.userId, role: 'Empleado' });
    await ApiHandler.updateJobApplicationStatus({ jobAppId: model.id, roleid: model.roleId, status: 'Approved' });
    checkNotifications(ApiHandler.userDetails.id);
    update();
  };

  if (!bussinessDetails) {
    return <div>Loading...</div>;
  }

  const imageUrl = SearchImage({ folder: 'Establishment' }).getImage(bussinessDetails.profileImage);

  return (
    <div className="card">
      <div className="card-content">
        <div className="card-header">
          <img src={imageUrl} alt="Bussiness" className="avatar" />
          <h3>Oferta de empleo</h3>
          <p>{`${bussinessDetails.bussinessName} desea que seas parte del establecimiento. Presiona aceptar para confirmar la solicitud o cancelar para rechazar la oferta.`}</p>
        </div>
        <div className="card-actions">
          <button onClick={handleCancel}>Cancelar</button>
          <button onClick={handleAccept}>Aceptar</button>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationNotification;
