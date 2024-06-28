import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import loginImage from '../Assets/turnoexpress.png';

function Login() {
    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    });

    const { email, password } = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        console.log(usuario);
        // Validate the input and perform the login action
    }

    return (
        <div className='wrapper'>
            <form onSubmit={onSubmit}>
                <img src={loginImage} alt="Login" className="login-image" />
                <div className="input-box">
                    <FaRegUser className='icon' />
                    <input 
                        type="text" 
                        name="email" 
                        value={email} 
                        onChange={onChange} 
                        placeholder='Usuario' 
                        required 
                    />
                </div>
                <div className="input-box">
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
                    <label><input type="checkbox" />Recordar contraseña </label>
                    <a href="#">He olvidado mi contraseña</a>
                </div>
                <button type="submit">Iniciar Sesión</button>
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
