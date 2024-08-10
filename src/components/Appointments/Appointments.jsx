import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import './Appointments.css'; // External CSS for styles

const Appointments = () => {
  const { user } = useContext(AuthContext); // Get user data from AuthContext
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null); // State to manage the editing appointment
  const [formData, setFormData] = useState({
    establishmentId: '',
    serviceId: '',
    employeeId: '',
    statusId: ''
  });

  const fetchAppointmentsDetails = async (appointments) => {
    const updatedAppointments = await Promise.all(
      appointments.map(async (appointment) => {
        
        const serviceResponse = await axios.get(`https://localhost:7207/api/v1/Services/${appointment.serviceId}`);
        const serviceDetails = serviceResponse.data.data;

      
        const establishmentResponse = await axios.get(`https://localhost:7207/api/v1/Establishments/${appointment.establishmentId}`);
        const establishmentDetails = establishmentResponse.data.data;

        
        const employeeResponse = await axios.get(`https://localhost:7207/api/v1/Employee?EstablishmentId=${appointment.establishmentId}`);
        const employeeDetails = employeeResponse.data.data.items.find(emp => emp.id === appointment.employeeId);

        return {
          ...appointment,
          serviceDetails,
          establishmentDetails,
          employeeDetails,
        };
      })
    );

    setAppointments(updatedAppointments);
  };

  const fetchAppointments = async () => {
    if (user && user.data.id) {
      const userId = user.data.id;
      const url = `https://localhost:7207/api/v1/Appointments?UserId=${userId}`;
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const appointments = response.data.data.items;
          fetchAppointmentsDetails(appointments); 
        }
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    }
  };

  const handleDelete = async (appointmentId) => {
    const url = `https://localhost:7207/api/v1/Appointments/${appointmentId}`;
    try {
      const response = await axios.delete(url);
      if (response.status === 200) {
        alert('Cita cancelada correctamente');
        fetchAppointments(); 
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert('Hubo un error al cancelar la cita');
    }
  };

  const handleEdit = async () => {
    const url = `https://localhost:7207/api/v1/Appointments/${editingAppointment.id}`;
    try {
      const response = await axios.put(url, formData);
      if (response.status === 200) {
        alert('Cita actualizada correctamente');
        fetchAppointments(); 
        setEditingAppointment(null); 
      }
    } catch (error) {
      console.error("Error editing appointment:", error);
      alert('Hubo un error al editar la cita');
    }
  };

  const openEditModal = (appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      establishmentId: appointment.establishmentId,
      serviceId: appointment.serviceId,
      employeeId: appointment.employeeId,
      statusId: appointment.statusId
    });
  };

  const closeEditModal = () => {
    setEditingAppointment(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  return (
    <div className="appointments-container">
      {appointments.length === 0 ? (
        <p>No tienes ninguna cita agendada</p>
      ) : (
        <table className="table appointments-table">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Establecimiento</th>
              <th>Servicio</th>
              <th>Empleado</th>
              <th>Posición</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{appointment.establishmentDetails?.businessName}</td>
                <td>{appointment.serviceDetails?.serviceName}</td>
                <td>{appointment.employeeDetails?.availabe ? 'Disponible' : 'No disponible'}</td>
                <td>{appointment.position}</td>
                <td>{new Date(appointment.date).toLocaleString()}</td>
                <td>{appointment.statusId}</td>
                <td>
                  <button
                    className="btn btn-edit"
                    onClick={() => openEditModal(appointment)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-cancel"
                    onClick={() => handleDelete(appointment.id)}
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for Editing Appointment */}
      {editingAppointment && (
        <div className="modal">
          <div className="modal-content">
            <h4>Editar Cita</h4>
            <form>
              <div className="form-group">
                <label htmlFor="establishmentId">Establecimiento:</label>
                <input
                  type="text"
                  id="establishmentId"
                  name="establishmentId"
                  value={formData.establishmentId}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="serviceId">Servicio:</label>
                <input
                  type="text"
                  id="serviceId"
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="employeeId">Empleado:</label>
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="statusId">Estado:</label>
                <input
                  type="text"
                  id="statusId"
                  name="statusId"
                  value={formData.statusId}
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                className="btn btn-save"
                onClick={handleEdit}
              >
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-close"
                onClick={closeEditModal}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;


