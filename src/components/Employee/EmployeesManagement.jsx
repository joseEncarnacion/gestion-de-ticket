import React, { useState, useEffect } from 'react';
import apiService from '../../api/apiService';
import './EmployeesManagement.css';

const EmployeesManagement = () => {
  const [employees, setEmployees] = useState([]);
  
//   useEffect(() => {
//     fetchEmployees();
//   }, []);
  
//   const fetchEmployees = () => {
//     apiService.get('/Employees')
//       .then(response => setEmployees(response.data))
//       .catch(error => console.error('Error fetching employees:', error));
//   };

//   const handleDelete = (id) => {
//     apiService.delete(`/Employees/${id}`)
//       .then(() => fetchEmployees())
//       .catch(error => console.error('Error deleting employee:', error));
//   };

  return (
    <div className="employees-management">
      <h1>Gestión de Empleados</h1>
      
    </div>
  );
};

export default EmployeesManagement;
