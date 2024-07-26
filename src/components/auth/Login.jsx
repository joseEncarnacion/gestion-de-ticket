import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import loginImage from '../Assets/turnoexpress.png';
import AlertaContext from "../../context/alert/alertContext";
import AuthContext from "../../context/autenticacion/authContext";

function Login() {
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { iniciarSesion } = authContext;

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

        // Validate input
        if (email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alert-danger');
            return;
        }

        // Perform the login action
        iniciarSesion({ email, password });
    }

    return (
        <div className='User-form'>
            {alerta && <div className={`alert ${alerta.categoria}`}>{alerta.mensaje}</div>}
            <form onSubmit={onSubmit}>
                <img src={loginImage} alt="Login" className="login-image" />
                <div className="form-group">
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
                    <label><input type="checkbox" /> Recordar contraseña </label>
                    <Link to="/">
                        <button className='btn btn-outliner-secundary' type="button">He olvidado mi contraseña</button>
                    </Link>
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
