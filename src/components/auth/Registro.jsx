import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { IoMdPhonePortrait } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import Swal from "sweetalert2";
import apiService from "../../api/apiService";
import loginImage from "../Assets/file2.png";
import "./Registro.css";

function Registro() {
  const [usuario, guardarUsuario] = useState({
    Nombre: "",
    Apellido: "",
    NomeUsuario: "",
    telefone: "",
    email: "",
    password: "",
    confirmar: "",
    ProfileImage: null,
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState(loginImage);
  const navigate = useNavigate();

  const { Nombre, Apellido, NomeUsuario, telefone, email, password, confirmar, ProfileImage } = usuario;

  const onChange = (e) => {
    if (e.target.name === "ProfileImage") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreviewUrl(event.target.result);
          Swal.fire({
            title: "Se agrego la imagen correctamente",
            imageUrl: event.target.result,
            imageAlt: "Se agrego la imagen correctamente",
            customClass: 'swal2-custom' // Clase personalizada
          });
        };
        reader.readAsDataURL(file);
        guardarUsuario({
          ...usuario,
          ProfileImage: file,
        });
      }
    } else {
      guardarUsuario({
        ...usuario,
        [e.target.name]: e.target.value,
      });
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmar) {
      Swal.fire({
        title: "Error",
        text: "Las contraseñas no coinciden",
        icon: "error",
        confirmButtonText: "Ok"
      });
      return;
    }

    if (!validatePassword(password)) {
      Swal.fire({
        title: "Error",
        text: "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.",
        icon: "error",
        confirmButtonText: "Ok"
      });
      return;
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, registrar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const formData = new FormData();
          formData.append('FirstName', Nombre);
          formData.append('LastName', Apellido);
          formData.append('UserName', NomeUsuario);
          formData.append('PhoneNumber', telefone);
          formData.append('Email', email);
          formData.append('Password', password);
          if (ProfileImage) {
            formData.append('ImageFile', ProfileImage);
          }

          const response = await apiService.create('/Account/register', formData);

          if (response.success) {
            swalWithBootstrapButtons.fire({
              title: "Registrado!",
              text: "Usuario registrado con éxito.",
              icon: "success"
            }).then(() => {
              navigate("/"); // Redirige a la ruta donde está el componente Login
            });
          } else {
            swalWithBootstrapButtons.fire({
              title: "Error",
              text: response.message || "Error al registrar el usuario",
              icon: "error"
            });
          }
        } catch (error) {
          console.error("Error durante la solicitud:", error);
          swalWithBootstrapButtons.fire({
            title: "Error",
            text: error.response?.data.message || 'Error al registrar el usuario',
            icon: "error"
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "El registro ha sido cancelado",
          icon: "error"
        });
      }
    });
  };

  return (
    <div className="User-form">
      <div className="form-container dark-shadow">
        <form onSubmit={onSubmit}>
          <img src={imagePreviewUrl} alt="Login" className="login-image" onClick={() => document.getElementById('ProfileImage').click()} />
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
            <input
              type="text"
              className="form-control"
              name="NomeUsuario"
              id="NomeUsuario"
              value={NomeUsuario}
              placeholder="Nombre de Usuario"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <IoMdPhonePortrait className="iconRegistro" />
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
            <FaRegUser className="iconRegistro" />
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
            <RiLockPasswordFill className="iconRegistro" />
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
            <RiLockPasswordFill className="iconRegistro" />
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

          <input
            type="file"
            id="ProfileImage"
            name="ProfileImage"
            style={{ display: 'none' }}
            onChange={onChange}
          />

          <div className="form-group mt-3">
            <button type="submit">Registrate</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro;
