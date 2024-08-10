// src/providers/NotificationsProvider.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiHandler from '../api_handler';
// import JobApplicationMapper from './Mappers/JobApplicationMapper ';

const NotificationsContext = createContext();

export const useNotifications = () => useContext(NotificationsContext);

const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const checkNotifications = async (userId) => {
    const appointmentNotifications = await ApiHandler.checkAppointmentsNotificationsByPosition(userId, 1);
    const jobApplications = await ApiHandler.checkJobApplications(userId);

    setNotifications([...appointmentNotifications, ...jobApplications]);
  };

  useEffect(() => {
    // Llamar a la función checkNotifications con el userId adecuado
    // Ejemplo: checkNotifications('someUserId');
  }, []);

  return (
    <NotificationsContext.Provider value={{ notifications, checkNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;
