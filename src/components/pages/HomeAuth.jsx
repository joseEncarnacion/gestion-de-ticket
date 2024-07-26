import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './HomeAuth.css';
import logo from '../Assets/turnoexpress.png';
import defaultProfilePic from '../Assets/turnoexpress.png';
import { RxMagnifyingGlass } from "react-icons/rx";

const HomeInitialAUTH = () => {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [profilePic, setProfilePic] = useState(defaultProfilePic);
    const navigate = useNavigate();

    useEffect(() => {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        if (userProfile && userProfile.profileImage) {
            setProfilePic(`${userProfile.profileImage}`);
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
                    localStorage.removeItem('userProfile');
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
                <div className="promotions-list">
                    {["Pedicura + Manicura - $30", "Corte + Tinte - $35"].map((promo, index) => (
                        <div key={index} className="promotion-item">
                            <div className="promotion-image"></div>
                            <p>{promo}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="services-list-container">
                <h2>Nuestros Servicios</h2>
                <div className="services-list">
                    {services.map((service, index) => (
                        <div key={index} className="service-item">
                            <div className="service-image"></div>
                            <p>{service.title}</p>
                            <p>{service.duration} · {service.price}</p>
                            <div className="service-rating">{service.rating}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeInitialAUTH;
