import React, { useState } from 'react';
import './ServicioCalendario.css';
import loginImage from '../Assets/turnoexpress.png';
//Aqui carga 
const days = [
  { date: '2023-06-16', day: 'FRI' },
  { date: '2023-06-17', day: 'SAT' },
  { date: '2023-06-18', day: 'SUN' },
  { date: '2023-06-19', day: 'MON' },
];

const initialTimeSlots = {
  '2023-06-16': { '8:00 AM': true, '9:00 AM': false, '10:00 AM': false, '11:00 AM': false, '12:00 PM': false, '1:00 PM': true, '2:00 PM': true, '3:00 PM': false, '4:00 PM': true, '5:00 PM': false },
  '2023-06-17': { '8:00 AM': true, '9:00 AM': true, '10:00 AM': true, '11:00 AM': true, '12:00 PM': true, '1:00 PM': true, '2:00 PM': true, '3:00 PM': true, '4:00 PM': true, '5:00 PM': true },
  '2023-06-18': { '8:00 AM': true, '9:00 AM': true, '10:00 AM': true, '11:00 AM': true, '12:00 PM': true, '1:00 PM': true, '2:00 PM': true, '3:00 PM': true, '4:00 PM': true, '5:00 PM': true },
  '2023-06-19': { '8:00 AM': true, '9:00 AM': true, '10:00 AM': true, '11:00 AM': true, '12:00 PM': true, '1:00 PM': true, '2:00 PM': true, '3:00 PM': true, '4:00 PM': true, '5:00 PM': true },
};

const ServicioCalendario = ({ Servicio, onClose, onSave }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState(initialTimeSlots);

  const handleSave = () => {
    if (selectedDay && selectedTime && timeSlots[selectedDay][selectedTime]) {
      onSave({ Servicio, date: selectedDay, time: selectedTime });
      onClose();
    } else {
      alert('Por favor, seleccione un día y una hora disponibles.');
    }
  };

  return (
     // para reducir el tamano de la imagen, se puede modificar el valor de maxWidth
    <div className="booking-calendar">
      <h2>{Servicio.name}</h2>
      <img src={loginImage} alt={Servicio.name} style={{ maxWidth: '20%', height: 'auto' }} /> 
      <p>{Servicio.description}</p>
      <p className="price">${Servicio.price}</p>
      <div className="calendar-container">
        <div className="days">
          {days.map((day) => (
            <button
              key={day.date}
              className={`day-button ${selectedDay === day.date ? 'selected' : ''}`}
              onClick={() => setSelectedDay(day.date)}
            >
              <div>{day.date.split('-').pop()}</div>
              <div>{day.day}</div>
            </button>
          ))}
        </div>
        {selectedDay && (
          <div className="time-slots">
            {Object.keys(timeSlots[selectedDay]).map((slot) => (
              <button
                key={slot}
                className={`time-slot ${selectedTime === slot ? 'selected' : ''} ${!timeSlots[selectedDay][slot] ? 'unavailable' : ''}`}
                onClick={() => timeSlots[selectedDay][slot] && setSelectedTime(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        )}
      </div>   
      <button onClick={handleSave}>Guardar cambios</button>
      <button onClick={onClose}>Cerrar</button>
      
    </div>
  );
};

export default ServicioCalendario;
