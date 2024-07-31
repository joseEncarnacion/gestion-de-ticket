import React, { useState, useEffect } from 'react';
import apiService from '../../api/apiService';
import './JobApplicationsManagement.css';

const JobApplicationsManagement = () => {
  const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   const fetchApplications = () => {
//     apiService.get('/JobApplications')
//       .then(response => setApplications(response.data))
//       .catch(error => console.error('Error fetching applications:', error));
//   };

//   const handleDelete = (id) => {
//     apiService.delete(`/JobApplications/${id}`)
//       .then(() => fetchApplications())
//       .catch(error => console.error('Error deleting application:', error));
//   };

  return (
    <div className="job-applications-management">
      <h1>Gestión de Solicitudes de Empleo</h1>
      <ul>
        {applications.map(application => (
          <li key={application.id}>
            <span>{application.details}</span>
            <button onClick={() => console.log('Modificar', application.id)}>Modificar</button>
            <button onClick={() => console.log(application.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobApplicationsManagement;
