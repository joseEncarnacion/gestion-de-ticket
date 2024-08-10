import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import apiService from "../../api/apiService";
import loginImage from "../Assets/file2.png";
import "./Configprofiles.css";

function Configprofiles() {
  const [usuario, setUsuario] = useState({
    Id: "",
    FirstName: "",
    LastName: "",
    UserName: "",
    ProfileImage: null,
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState(loginImage);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile && userProfile.userName) {
      apiService.getUserByUsername(userProfile.userName).then(response => {
        const data = response.data;
        setUsuario({
          Id: data.id,
          FirstName: data.firstName,
          LastName: data.lastName,
          UserName: data.userName,
          ProfileImage: data.profileImage,
        });
        if (data.profileImage) {
          setImagePreviewUrl(`https://localhost:7207/api/v1/Images/%20?folderName=CustomIdentityUser&imageName=${userProfile.profileImage}`);
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
            imageAlt: "Imagen agregada",
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

    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar cambios",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const formData = new FormData();
          formData.append('Id', usuario.Id);
          formData.append('FirstName', usuario.FirstName);
          formData.append('LastName', usuario.LastName);
          formData.append('UserName', usuario.UserName);
          if (usuario.ProfileImage) {
            formData.append('ImageFile', usuario.ProfileImage);
            formData.append('ProfileImage', usuario.ProfileImage.name); // Añadir el nombre de la imagen
          }

          const response = await apiService.update(`/Account/update/${usuario.Id}`, formData);

          Swal.fire({
            title: "Actualizado!",
            text: "Usuario actualizado con éxito.",
            icon: "success"
          }).then(() => {
            setIsEditing(false);
          });

        } catch (error) {
          console.error("Error durante la solicitud:", error);
          Swal.fire({
            title: "Error",
            text: error.response?.data.message || 'Error al actualizar el usuario',
            icon: "error"
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelado",
          text: "La actualización ha sido cancelada",
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
              name="FirstName"
              id="FirstName"
              value={usuario.FirstName}
              placeholder="Nombre"
              onChange={onChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="LastName"
              id="LastName"
              value={usuario.LastName}
              placeholder="Apellido"
              onChange={onChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="UserName"
              id="UserName"
              value={usuario.UserName}
              placeholder="Nombre de Usuario"
              onChange={onChange}
              disabled={!isEditing}
            />
          </div>

          <input
            type="file"
            id="ProfileImage"
            name="ProfileImage"
            style={{ display: 'none' }}
            onChange={onChange}
            disabled={!isEditing}
          />
          <div className="form-group mt-3">
            <button type="button" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancelar Edición" : "Editar"}
            </button>
            {isEditing && (
              <button type="submit">Guardar</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Configprofiles;
