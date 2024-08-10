

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import './CreateAppointment.css';

const CreateAppointment = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    establishmentId: '',
    serviceId: '',
    employeeId: '',
    statusId: 1, 
  });

 
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://localhost:7207/api/v1/Services');
        if (response.status === 200) {
          setServices(response.data.data.items);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);


  const fetchEmployeeId = async (establishmentId) => {
    try {
      const response = await axios.get(`https://localhost:7207/api/v1/Employee?EstablishmentId=${establishmentId}`);
      if (response.status === 200) {
        const employeeId = response.data.data.items[0]?.id || '';
        setFormData((prevData) => ({
          ...prevData,
          employeeId,
        }));
      }
    } catch (error) {
      console.error('Error fetching employee ID:', error);
    }
  };

  
  const handleServiceSelect = (service) => {
    setFormData({
      ...formData,
      establishmentId: service.establishmentId,
      serviceId: service.id,
    });

    // 
    fetchEmployeeId(service.establishmentId);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.data.id) {
      alert('No se pudo obtener el ID del usuario autenticado.');
      return;
    }

    const appointmentData = {
      userId: user.data.id,
      establishmentId: formData.establishmentId,
      serviceId: formData.serviceId,
      employeeId: formData.employeeId,
      statusId: formData.statusId,
    };

    try {
      const response = await axios.post('https://localhost:7207/api/v1/Appointments', appointmentData);
      if (response.status === 201) {
        alert('Cita creada exitosamente');
        // Limpiar formulario
        setFormData({
          establishmentId: '',
          serviceId: '',
          employeeId: '',
          statusId: 1,
        });
      }
    } catch (error) {
      console.error('Error al crear la cita:', error);
      alert('Hubo un error al crear la cita.');
    }
  };

  return (
    <div className="create-appointment-container">
      <h2>Crear Nueva Cita</h2>
      <div className="services-list">
        <h3>Seleccione un Servicio</h3>
        {services.length === 0 ? (
          <p>No hay servicios disponibles.</p>
        ) : (
          services.map((service) => (
            <div key={service.id} className="service-item">
              <img src={`https://localhost:7207/images/${service.serviceImage}`} alt={service.serviceName} />
              <h4>{service.serviceName}</h4>
              <p>Duración: {service.duration} minutos</p>
              <p>Precio: ${service.price}</p>
              <button onClick={() => handleServiceSelect(service)}>Tomar Turno</button>
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit} className="create-appointment-form">
        <div className="form-group">
          <label htmlFor="employeeId">ID del Empleado</label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            value={formData.employeeId}
            readOnly
          />
        </div>
        <button type="submit" className="btn-submit">Crear Cita</button>
      </form>
    </div>
  );
};

export default CreateAppointment;
