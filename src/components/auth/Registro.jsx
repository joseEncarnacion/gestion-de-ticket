import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { IoMdPhonePortrait } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import loginImage from "../Assets/turnoexpress.png";
import "./Registro.css";

function Registro() {
  const [usuario, guardarUsuario] = useState({
    Nombre: "",
    Apellido: "",
    NombreUsuario: "",
    telefone: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const { Nombre, Apellido, telefone, email, password, confirmar } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(usuario);
  };

  return (
    <div className="User-form">
      <div className="form-container dark-shadow">
        <form onSubmit={onSubmit}>
          <img src={loginImage} alt="Login" className="login-image" />
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="Nombre"
              id="Nombre"
              value={Nombre}
              placeholder="Nombre"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="Apellido"
              id="Apellido"
              value={Apellido}
              placeholder="Apellido"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <IoMdPhonePortrait className="icon" />
            <input
              type="text"
              className="form-control"
              name="telefone"
              id="telefone"
              value={telefone}
              placeholder="Teléfono"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <FaRegUser className="icon" />
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              value={email}
              placeholder="Correo electrónico"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <RiLockPasswordFill className="icon" />
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              name="password"
              placeholder="Contraseña"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <RiLockPasswordFill className="icon" />
            <input
              type="password"
              className="form-control"
              id="confirmar"
              value={confirmar}
              name="confirmar"
              placeholder="Repita la contraseña"
              onChange={onChange}
            />
          </div>

          <div className="form-group mt-3">
            <button type="submit">Registrate</button>
          </div>

          <div className="Iniciar-sesion-link">
            <Link to="/">
              <button type="submit">Iniciar Sesión</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro;
