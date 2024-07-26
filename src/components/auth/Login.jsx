import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Login.css';
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import loginImage from '../Assets/turnoexpress.png';
import apiService from '../../api/apiService';

function Login() {
    const [usuario, setUsuario] = useState({
        userName: '',
        password: ''
    });
    const [rememberPassword, setRememberPassword] = useState(false);

    const { userName, password } = usuario;
    const navigate = useNavigate();

    useEffect(() => {
        const savedUserName = localStorage.getItem('userName');
        const savedPassword = localStorage.getItem('password');
        if (savedUserName && savedPassword) {
            setUsuario({
                userName: savedUserName,
                password: savedPassword
            });
            setRememberPassword(true);
        }
    }, []);

    const onChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    };

    const onRememberChange = () => {
        setRememberPassword(!rememberPassword);
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const response = await apiService.login({
                userName,
                password
            });

            if (response.success) {
                if (rememberPassword) {
                    localStorage.setItem('userName', userName);
                    localStorage.setItem('password', password);
                } else {
                    localStorage.removeItem('userName');
                    localStorage.removeItem('password');
                }
                // Guarda los datos del usuario en localStorage
                localStorage.setItem('userProfile', JSON.stringify(response.data));
                
                Swal.fire({
                    title: "Bienvenido",
                    text: `Inicio de sesión exitoso. Bienvenido ${userName}`,
                    icon: "success",
                    confirmButtonText: "Continuar"
                }).then(() => {
                    navigate("/HomeInitialAUTH");
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: response.message,
                    icon: "error",
                    confirmButtonText: "Intentar nuevamente"
                });
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            Swal.fire({
                title: "Error",
                text: "No se pudo iniciar sesión. Por favor, verifica tus credenciales e intenta nuevamente.",
                icon: "error",
                confirmButtonText: "Intentar nuevamente"
            });
        }
    };

    return (
        <div className='User-form'>
            <form onSubmit={onSubmit}>
                <img src={loginImage} alt="Login" className="login-image" />
                <div className="form-group">
                    <FaRegUser className='icon' />
                    <input 
                        type="text" 
                        name="userName" 
                        value={userName} 
                        onChange={onChange} 
                        placeholder='Usuario' 
                        required 
                    />
                </div>
                <div className="form-group">
                    <RiLockPasswordFill className='icon' />
                    <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={onChange} 
                        placeholder='Contraseña' 
                        required 
                    />
                </div>
                <div className="remember-forgot">
                    <label>
                        <input 
                            type="checkbox" 
                            checked={rememberPassword} 
                            onChange={onRememberChange} 
                        /> 
                        Recordar contraseña 
                    </label>
                    <a href="#">He olvidado mi contraseña</a>
                </div>
                <div className="form-group">
                    <button type="submit">Iniciar Sesión</button>
                </div>
                <div className="register-link">
                    <Link to="/Registro">
                        <button type="button">Regístrate</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
