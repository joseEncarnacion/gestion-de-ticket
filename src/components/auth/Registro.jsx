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
  //valores del context alerta
  const alertaContest = useContext(AlertaContext);
  const {alerta, mostrarAlerta} = alertaContest;

  //context de auth
  const authContext = useContext(AuthContext);
  const { RegistrarUsario } = authContext;
 

  const [usuario, guardarUsuario] = useState({
    Nombre: "",
    Apellido: "",
    NombreUsuario: "",
    telefone: "",
    email: "",
    password: "",
    confirmar: "",
    ImageFile: ""
  });

  const { Nombre, Apellido, telefone, email, password, confirmar, NombreUsuario, ImageFile } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(usuario);

    //validate not empty input
    if (
      Nombre.trim() === "" ||
      Apellido.trim() === "" ||
      telefone.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta(
         "Todos los campos son obligatorios",
         "alert-danger"
      );
      return;
      
    }


    //validare password > to 5
    if(password.length < 6){
      mostrarAlerta(
        "La contraseña debe tener al menos 6 caracteres",
        "alert-danger"
      );
      return;
    }

    //validate if password is different
    if(password!== confirmar){
      mostrarAlerta(
        "Las contraseñas no coinciden",
        "alert-danger"
      );
      return;
    }

    // registration of the user
    //... register user logic here

    RegistrarUsario({
      Nombre,
      Apellido,
      telefone,
      email,
      password,
      NombreUsuario, 
      ImageFile
    });
    
  };

  return (
    <div className="User-form">
      {alerta ? (<div className={`alert ${alerta.categoria}`}> {alerta.mensage} </div>): null}
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
