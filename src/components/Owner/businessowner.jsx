import React, { useState } from 'react';
import './businessowner.css';
import logo from '../Assets/turnoexpress.png';
import { FaRegUser } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";
import { Link } from 'react-router-dom';

const BusinessOwner = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [establishments, setEstablishments] = useState([]);
  const [employees, setEmployees] = useState([]);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const addEstablishment = () => {
    const newEstablishment = prompt('Ingrese el nombre del nuevo establecimiento');
    if (newEstablishment) {
      setEstablishments([...establishments, newEstablishment]);
    }
  };

  const addEmployee = () => {
    const newEmployee = prompt('Ingrese el nombre del nuevo empleado');
    if (newEmployee) {
      setEmployees([...employees, newEmployee]);
    }
  };

  return (
    <div className='business-owner'>
      <div className="business-owner-header-content">
                <div className="logo">
                    <img src={logo} alt="Barbería Corte Perfecto" />
                    <span>Filtro de ubicacion</span>
                </div>
                <div className="search-profile">
                    <div className="search-container">
                    <RxMagnifyingGlass className='search-icon' />
                        <input type="text" placeholder="Buscar servicios" />
                    
                    </div>
                    <div className="profile" onClick={toggleProfileMenu}>
                        <FaRegUser className='icon' />
                        <span>Mi Perfil</span>
                        <span>▼</span>
                    </div>
                    {profileMenuOpen && (
                        <div className="profile-menu">
                            <div className="profile-option">Configurar Perfil</div>
                            <div className="profile-option">Cerrar Cuenta</div>
                        </div>
                    )}
                </div>
            </div>
      <div className="business-owner-services">
        <h1>Bienvenido</h1>
        <div className="business-owner-buttons">
          <Link to="/servicejob"><button>Servicios</button></Link>
          <button>Vistas de turno</button>
          <button>Empleados</button>
          <button>Establecimiento</button>
        </div>
      </div>
      <div className="business-owner-featured-services">
        <h3>Servicio de negocio</h3>
        <div className="business-owner-services-list">
          <div className="business-owner-service-item">
            <div className="business-owner-carousel">
              {services.map((service, index) => (
                <div key={index} className="business-owner-carousel-item">
                  <p>{service}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <h3>El establecimiento</h3>
        <div className="business-owner-promotions-list">
          <div className="business-owner-promotion-item">
            <div className="business-owner-carousel">
              {establishments.map((establishment, index) => (
                <div key={index} className="business-owner-carousel-item">
                  <p>{establishment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <h2>Gestiona los empleados</h2>
      <div className="business-owner-services-list">
        <div className="business-owner-service-item">
          <button className="business-owner-create-button" onClick={addEmployee}>Agregar Empleado</button>
          <div className="business-owner-carousel">
            {employees.map((employee, index) => (
              <div key={index} className="business-owner-carousel-item">
                <p>{employee}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOwner;
