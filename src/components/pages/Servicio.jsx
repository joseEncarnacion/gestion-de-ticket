import React, { useState } from 'react';
import './Servicio.css';
import ServicioCalendario from './ServicioCalendario';
  
const categories = ['Todos', 'Cabello', 'Masaje', 'Facial', 'Manicure', 'Pedicure'];

const servicios = [
  {
    id: 1,
    name: 'Corte de Cabello',
    category: 'Cabello',
    price: 500,
    description: 'Corte de cabello profesional para todas las edades.',
    image: './assets/hairstyling_4424446.png'
  },
  {
    id: 2,
    name: 'Masaje Relajante',
    category: 'Masaje',
    price: 1200,
    description: 'Masaje relajante de una hora con aceites esenciales.',
    image: './assets/massage_1.png'
  },
  // Agrega más servicios aquí...
];

function Servicio() {
  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedServicio, setSelectedServicio] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const filteredServicios = servicios.filter(servicio =>
    servicio.name.toLowerCase().includes(filter.toLowerCase()) &&
    (selectedCategory === 'Todos' || servicio.category === selectedCategory)
  );

  const handleSaveAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
    alert('Cita guardada con éxito!');
  };

  return (
    <div className="App">
      <header className="home-header">
        <div className="header-content">
          <div className="logo">
            <h1>Servicios de Belleza</h1>
          </div>
          <div className="search-profile">
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Buscar servicios..." 
                className="search-bar"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>
      <div></div>
      <div className="App-content">
        <div className="categories">
          {categories.map(category => (
            <button 
              key={category} 
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="servicio-list">
          {filteredServicios.map(servicio => (
            <div key={servicio.id} className="servicio-item">
              <img src={servicio.image} alt={servicio.name} className="servicio-image" />
              <h3>{servicio.name}</h3>
              <p>{servicio.description}</p>
              <p>${servicio.price}</p>
              <button className="reservar-button" onClick={() => setSelectedServicio(servicio)}>Reservar</button>

            </div>
          ))}
      
        </div>
        {selectedServicio && 
          <ServicioCalendario 
            Servicio={selectedServicio} 
            onClose={() => setSelectedServicio(null)} 
            onSave={handleSaveAppointment}
          />
        }
      </div>
    </div>
  );
}

export default Servicio;
