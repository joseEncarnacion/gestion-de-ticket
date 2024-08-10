import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import apiService from "../../api/apiService"; // Asegúrate de importar apiService correctamente
import loginImage from "../Assets/file2.png";
import "./Configprofiles.css";

function Configprofiles() {
  const [usuario, setUsuario] = useState({
    Nombre: "",
    Apellido: "",
    NomeUsuario: "",
    email: "",
    phoneNumber: "",
    roles: "",
    ProfileImage: null,
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState(loginImage);
  const [isOwner, setIsOwner] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile && userProfile.userName) {
      apiService.getUserByUsername(userProfile.userName).then(response => {
        const data = response.data;
        setUsuario({
          Nombre: data.firstName,
          Apellido: data.lastName,
          NomeUsuario: data.userName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          roles: data.roles.join(', '),
          ProfileImage: data.profileImage,
        });
        if (data.profileImage) {
          setImagePreviewUrl(`https://localhost:7207/api/v1/Images/%20?folderName=CustomIdentityUser&imageName=${data.profileImage}`);
        }
      }).catch(error => {
        console.error("Error fetching user data:", error);
      });
    }
  }, []);

  const onChange = (e) => {
    if (e.target.name === "ProfileImage") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreviewUrl(event.target.result);
          Swal.fire({
            title: "Se agregó la imagen correctamente",
            imageUrl: event.target.result,
            imageAlt: "Se agregó la imagen correctamente",
            customClass: 'swal2-custom'
          });
        };
        reader.readAsDataURL(file);
        setUsuario({
          ...usuario,
          ProfileImage: file,
        });
      }
    } else {
      setUsuario({
        ...usuario,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

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
          formData.append('FirstName', usuario.Nombre);
          formData.append('LastName', usuario.Apellido);
          formData.append('UserName', usuario.NomeUsuario);
          if (usuario.ProfileImage) {
            formData.append('ImageFile', usuario.ProfileImage);
          }
          formData.append('IsOwner', isOwner);
          formData.append('IsEmployee', isEmployee);

          const response = await apiService.create('/Account/userbyusername', formData); // Usa apiService.create

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
              value={usuario.Nombre}
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
              value={usuario.Apellido}
              placeholder="Apellido"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              value={usuario.email}
              placeholder="email"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              id="phoneNumber"
              value={usuario.phoneNumber}
              placeholder="Numero de telefono"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="roles"
              id="roles"
              value={usuario.roles}
              placeholder="Rolo de Usuario"
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
            <button type="submit">Editar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Configprofiles;
