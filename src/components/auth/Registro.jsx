import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { IoMdPhonePortrait } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import loginImage from "../Assets/turnoexpress.png";
import "./Registro.css";
import AlertaContext from "../../context/alert/alertContext";
import AuthContext from "../../context/autenticacion/authContext";

function Registro() {
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { RegistrarUsuario } = authContext;

  const [usuario, guardarUsuario] = useState({
    FirstName: "",
    LastName: "",
    UserName: "",
    Email: "",
    PhoneNumber: "",
    Password: "",
    confirmar: "",
    ImageFile: null
  });

  const { FirstName, LastName, PhoneNumber, Email, Password, UserName, confirmar } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChange = (e) => {
    guardarUsuario({
      ...usuario,
      ImageFile: e.target.files[0],
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      FirstName.trim() === "" ||
      LastName.trim() === "" ||
      PhoneNumber.trim() === "" ||
      Email.trim() === "" ||
      Password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alert-danger");
      return;
    }

    if (Password.length < 6) {
      mostrarAlerta("La contraseña debe tener al menos 6 caracteres", "alert-danger");
      return;
    }

    if (Password !== confirmar) {
      mostrarAlerta("Las contraseñas no coinciden", "alert-danger");
      return;
    }

    const formData = new FormData();
    formData.append("FirstName", FirstName);
    formData.append("LastName", LastName);
    formData.append("UserName", UserName);
    formData.append("Email", Email);
    formData.append("PhoneNumber", PhoneNumber);
    formData.append("Password", Password);
    formData.append("ImageFile", usuario.ImageFile);

    RegistrarUsuario(formData);
  };

  return (
    <div className="User-form">
      {alerta && <div className={`alert ${alerta.categoria}`}>{alerta.mensaje}</div>}
      <div className="form-container dark-shadow">
        <form onSubmit={onSubmit}>
          <img src={loginImage} alt="Login" className="login-image" />
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="FirstName"
              value={FirstName}
              placeholder="Nombre"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="LastName"
              value={LastName}
              placeholder="Apellido"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="UserName"
              value={UserName}
              placeholder="Nombre de usuario"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              className="form-control"
              name="ImageFile"
              onChange={onFileChange}
            />
          </div>
          <div className="form-group">
            <IoMdPhonePortrait className="icon" />
            <input
              type="text"
              className="form-control"
              name="PhoneNumber"
              value={PhoneNumber}
              placeholder="Teléfono"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <FaRegUser className="icon" />
            <input
              type="email"
              className="form-control"
              name="Email"
              value={Email}
              placeholder="Correo electrónico"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <RiLockPasswordFill className="icon" />
            <input
              type="password"
              className="form-control"
              name="Password"
              value={Password}
              placeholder="Contraseña"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <RiLockPasswordFill className="icon" />
            <input
              type="password"
              className="form-control"
              name="confirmar"
              value={confirmar}
              placeholder="Confirmar contraseña"
              onChange={onChange}
            />
          </div>
          <div className="form-group mt-3">
            <button type="submit">Registrarse</button>
          </div>
          <div className="Iniciar-sesion-link">
            <Link to="/">
              <button type="button">Iniciar Sesión</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro;
