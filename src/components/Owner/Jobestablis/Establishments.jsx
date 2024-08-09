import React, { useState, useRef, useEffect } from "react";
import apiService from "../../../api/apiService";
import { RxMagnifyingGlass } from "react-icons/rx";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import "./Establishments.css";
import loginImage from "../../Assets/file2.png";

const MySwal = withReactContent(Swal);

const Establishments = ({ onEstablishmentsLoaded }) => {
  const [services, setServices] = useState([]);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [newService, setNewService] = useState({
    userId: "",
    businessName: "",
    location: "",
    workingHours: "",
    description: "",
    profileImage: "",
    imageFile: null
  });
  const fileInputRef = useRef(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(loginImage);
  const [profilePic, setProfilePic] = useState(loginImage);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile) {
      console.log("Perfil del usuario:", userProfile);
      setUserId(userProfile.id);
      if (userProfile.profileImage) {
        setProfilePic(`https://localhost:7207/api/v1/Images/%20?folderName=CustomIdentityUser&imageName=${userProfile.profileImage}`);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchServices();
    }
  }, [userId]);

  const fetchServices = () => {
    apiService.getAll('/Establishments')
      .then(response => {
        console.log("Servicios obtenidos:", response.data.items);
        const userServices = response.data.items.filter(service => service.userId === userId);
        console.log("Servicios del usuario:", userServices);
        setServices(userServices);
        onEstablishmentsLoaded(userServices); // Notificar al componente padre
      })
      .catch(error => {
        console.error("Error fetching services:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewService({ ...newService, imageFile: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewService((prevService) => ({
          ...prevService,
          profileImage: reader.result,
        }));
        setImagePreviewUrl(reader.result);
        MySwal.fire({
          title: 'Imagen cargada correctamente',
          imageUrl: reader.result,
          imageAlt: 'Imagen cargada',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addOrUpdateService = () => {
    const formData = new FormData();
    formData.append("Id", editingServiceId);
    formData.append("UserId", userId);
    formData.append("BusinessName", newService.businessName);
    formData.append("Location", newService.location);
    formData.append("WorkingHours", newService.workingHours);
    formData.append("Description", newService.description);
    formData.append("ProfileImage", newService.profileImage);
    if (newService.imageFile) {
      formData.append("ImageFile", newService.imageFile);
    }

    if (editingServiceId) {
      apiService.update(`/Establishments/${editingServiceId}`, formData)
        .then(response => {
          fetchServices();
          setNewService({
            userId: "",
            businessName: "",
            location: "",
            workingHours: "",
            description: "",
            profileImage: "",
            imageFile: null
          });
          setEditingServiceId(null);
        })
        .catch(error => {
          console.error("Error updating service:", error.response ? error.response.data : error.message);
        });
    } else {
      apiService.create('/Establishments', formData)
        .then(response => {
          fetchServices();
          setNewService({
            userId: "",
            businessName: "",
            location: "",
            workingHours: "",
            description: "",
            profileImage: "",
            imageFile: null
          });
        })
        .catch(error => {
          console.error("Error adding service:", error.response ? error.response.data : error.message);
        });
    }
  };

  const removeService = (id) => {
    apiService.delete(`/Establishments/${id}`)
      .then(() => {
        fetchServices();
      })
      .catch(error => {
        console.error("Error deleting service:", error);
      });
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const editService = (service) => {
    setNewService({
      userId: service.userId,
      businessName: service.businessName,
      location: service.location,
      workingHours: service.workingHours,
      description: service.description,
      profileImage: service.profileImage,
      imageFile: null
    });
    setEditingServiceId(service.id);
    setImagePreviewUrl(service.profileImage ? `https://localhost:7207/api/v1/Images/%20?folderName=Establishment&imageName=${service.profileImage}` : loginImage);
  };

  const cardStyle = {
    height: '400px',
    width: '100%',
    background: 'linear-gradient( #dddd68, #dddd6864, #ffffff)',
  };
  
  const imgStyle = {
    height: '150px',
    objectFit: 'cover',
  };
  
  const cardTextStyle = {
    fontSize: '14px', // Tamaño del texto más pequeño
    whiteSpace: 'nowrap', // Evita que el texto salte a la siguiente línea
    overflow: 'hidden', // Oculta el texto que excede los límites del contenedor
    textOverflow: 'ellipsis', // Añade "..." al final si el texto es demasiado largo
  };
  

  return (
    <div className="service-job">
      <div className="business-owner-search-profile">
        <img src={profilePic} alt="Profile" className="establecimiento_profile" />
        <h1>Gestión de Establecimientos</h1>
        <div className="business-owner-search-container">
          <RxMagnifyingGlass className="business-owner-search-icon" />
          <input type="text" placeholder="Buscar Establecimientos" />
        </div>
      </div>
      <div className="create-service-form">
        <input
          type="text"
          name="businessName"
          placeholder="Nombre del Negocio"
          value={newService.businessName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Ubicación"
          value={newService.location}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="workingHours"
          placeholder="Horas de Trabajo"
          value={newService.workingHours}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={newService.description}
          onChange={handleInputChange}
        />
        <div className="fimage-previewssd">
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          {imagePreviewUrl && (
            <div className="image-previewss">
              <img
                src={imagePreviewUrl}
                alt="Preview"
                onClick={handleFileInputClick}
                className="reduced-size"
              />
            </div>
          )}
        </div>
        <button onClick={addOrUpdateService}>
          {editingServiceId ? "Actualizar Servicio" : "Crear Servicio"}
        </button>
      </div>
      <Row xs={1} md={2} className="g-4">
        {services.length === 0 ? (
          <Col>
            <p>No hay establecimientos disponibles</p>
          </Col>
        ) : (
          services.map(service => (
            <Col key={service.id}>
              <Card style={cardTextStyle}>
                <Card.Img
                  variant="top"
                  src={`https://localhost:7207/api/v1/Images/%20?folderName=Establishment&imageName=${service.profileImage}`}
                  alt=""
                  style={imgStyle}
                />
                <Card.Body>
                  <Card.Title>{service.businessName}</Card.Title>
                  <Card.Text>
                    Ubicación: {service.location}
                  </Card.Text>
                  <Card.Text>
                    Horas: {service.workingHours}
                  </Card.Text>
                  <Card.Text>
                    Descripción: {service.description}
                  </Card.Text>
                  <button onClick={() => editService(service)}>Editar</button>
                  <button onClick={() => removeService(service.id)}>Eliminar</button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default Establishments;
