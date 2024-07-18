import React, { useState } from 'react';
import './businessowner.css';
import logo from '../Assets/turnoexpress.png';
import { FaRegUser } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";

const BusinessOwner = () => {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [services, setServices] = useState([]);
    const [establishments, setEstablishments] = useState([]);
    const [employees, setEmployees] = useState([]);

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    const addService = () => {
        const newService = prompt('Ingrese el nombre del nuevo servicio');
        if (newService) {
            setServices([...services, newService]);
        }
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
                <div className="business-owner-logo">
                    <img src={logo} alt="Barbería Corte Perfecto" />
                    <span>Filtro de ubicación</span>
                </div>
                <div className="business-owner-search-profile">
                    <div className="business-owner-search-container">
                        <RxMagnifyingGlass className='business-owner-search-icon' />
                        <input type="text" placeholder="Buscar servicios" />
                    </div>
                    <div className="business-owner-profile" onClick={toggleProfileMenu}>
                        <FaRegUser className='business-owner-icon' />
                        <span>Mi Perfil</span>
                        <span>▼</span>
                    </div>
                    {profileMenuOpen && (
                        <div className="business-owner-profile-menu">
                            <div className="business-owner-profile-option">Configurar Perfil</div>
                            <div className="business-owner-profile-option">Cerrar Cuenta</div>
                        </div>
                    )}
                </div>
            </div>
            <div className="business-owner-services">
                <h1>Bienvenido</h1>
                <div className="business-owner-buttons">
                    <button>Servicios</button>
                    <button>Vistas de turno</button>
                    <button>Empleados</button>
                    <button>Establecimiento</button>
                </div>
            </div>
            <div className="business-owner-featured-services">
                <h3>¿Qué servicio deseas gestionar?</h3>
                <div className="business-owner-services-list">
                    <div className="business-owner-service-item">

                        <button className="business-owner-create-button" onClick={addService}>Crear un nuevo Servicio</button>
                        <div className="business-owner-carousel">
                            {services.map((service, index) => (
                                <div key={index} className="business-owner-carousel-item">
                                    <p>{service}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <h3>Desea gestiona el establecimiento</h3>
                <div className="business-owner-promotions-list">
                    <div className="business-owner-promotion-item">
                        <button className="business-owner-create-button" onClick={addEstablishment}>Agregar Establecimiento</button>
                        <div className="business-owner-carousel">
                            {establishments.map((establishments, index) => (
                                <div key={index} className="business-owner-carousel-item">
                                    <p>{establishments}</p>
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
                            {employees.map((employees, index) => (
                                <div key={index} className="business-owner-carousel-item">
                                    <p>{employees}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default BusinessOwner;
