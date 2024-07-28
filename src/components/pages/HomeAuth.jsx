import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './HomeAuth.css';
import logo from '../Assets/turnoexpress.png';
import { RxMagnifyingGlass } from "react-icons/rx";

const HomeInitialAUTH = () => {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [profilePic, setProfilePic] = useState('');
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
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "¿Estás seguro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "No, cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "¡Cerrado!",
                    text: "Tu sesión ha sido cerrada.",
                    icon: "success"
                }).then(() => {
                    // Lógica adicional para cerrar sesión, como limpiar tokens
                    localStorage.clear(); // Limpiar todo el localStorage
                    navigate('/'); // Redirige al login
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Tu sesión sigue activa.",
                    icon: "error"
                });
            }
        });
    };

    const services = [
        { title: "Servicio 1", duration: "20 min", price: "$25", rating: "4.1" },
        { title: "Servicio 2", duration: "25 min", price: "$25", rating: "4.2" },
        { title: "Servicio 3", duration: "30 min", price: "$25", rating: "4.3" },
    ];

    return (
        <div className='home-header'>
            <div className="header-content">
                <div className="logo">
                    <img src={logo} alt="Barbería Corte Perfecto" />
                    <span>Filtro de ubicación</span>
                </div>
                <div className="search-profile">
                    <div className="search-container">
                        <RxMagnifyingGlass className='search-icon' />
                        <input type="text" placeholder="Buscar servicios" />
                    </div>
                    <div className="profile" onClick={toggleProfileMenu}>
                        <img src={profilePic} alt="Profile" className='profile-pic' />
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
            <div className="services">
                <h1>¿Qué servicio deseas hoy?</h1>
                <div className="buttons">
                    <button>Corte de Cabello</button>
                    <button>Tinte</button>
                    <button>Manicura</button>
                    <button>Pedicura</button>
                    <button>Depilación</button>
                    <button>Masaje</button>
                </div>
            </div>
            <div className="featured-services">
                <h3>Servicios Destacados</h3>
                <div className="services-list">
                    {["Corte de Cabello - $20", "Corte de Cabello - $20", "Corte de Cabello - $20", "Corte de Cabello - $20"].map((service, index) => (
                        <div key={index} className="service-item">
                            <div className="service-image"></div>
                            <p>{service}</p>
                        </div>
                    ))}
                </div>
                <h3>Promociones Especiales</h3>
                <div className="services-list">
                    {services.map((service, index) => (
                        <div key={index} className="service-item">
                            <div className="service-image"></div>
                            <div className="service-details">
                                <h4>{service.title}</h4>
                                <p>Duración: {service.duration}</p>
                                <p>Precio: {service.price}</p>
                                <p>Rating: {service.rating}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeInitialAUTH;
