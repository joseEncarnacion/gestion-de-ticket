import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './businessowner.css';
import logo from '../Assets/turnoexpress.png';
import { FaRegUser } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";

const BusinessOwner = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const [services, setServices] = useState([]);
  const [establishments, setEstablishments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile && userProfile.profileImage) {
      setProfilePic(`https://localhost:7207/api/v1/Images/%20?folderName=CustomIdentityUser&imageName=${userProfile.profileImage}`);
    }
  }, []);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const logout = () => {
    navigate('/');
  };

  const addEstablishment = () => {
    const newEstablishment = prompt('Ingrese el nombre del nuevo establecimiento');
    if (newEstablishment) {
      setEstablishments([...establishments, newEstablishment]);
    }
  };

  
  const addEmployee = () => {
    navigate('/Rolesprofiles');
  };
  const AgreEstablishment = () => {
    navigate('/Establishments');
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
            {profilePic ? (
              <img src={profilePic} alt="Profile" className='profile-pic' />
            ) : (
              <FaRegUser className='icon' />
            )}
            <span>Mi Perfil</span>
            <span>▼</span>
          </div>
          {profileMenuOpen && (
            <div className="profile-menu">
              <div className="profile-option">Configurar Perfil</div>
              <div className="profile-option" onClick={logout}>Cerrar Sesión</div>
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
          <Link to="/Establishments"><button>Establecimiento</button></Link>
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
         
        </div>
      </div>
    </div>
  );
};

export default BusinessOwner;
