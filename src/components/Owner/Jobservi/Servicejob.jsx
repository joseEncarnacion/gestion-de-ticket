import React, { useState, useEffect, useRef } from "react";
import apiService from "../../../api/apiService";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { RxMagnifyingGlass } from "react-icons/rx";
import loginImage from "../../Assets/file2.png";
import "./Servicejob.css";

const MySwal = withReactContent(Swal);

const Servicejob = () => {
  const [services, setServices] = useState([]);
  const [establishments, setEstablishments] = useState([]);
  const [selectedEstablishment, setSelectedEstablishment] = useState(null);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [newService, setNewService] = useState({
    EstablishmentId: "",
    ServiceName: "",
    Duration: "",
    Price: "",
    ServiceImage: "",
    imageFile: null,
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState(loginImage);
  const [profilePic, setProfilePic] = useState(loginImage);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const userProfileString = localStorage.getItem('userProfile');
    if (userProfileString) {
      const userProfile = JSON.parse(userProfileString);
      if (userProfile && userProfile.profileImage) {
        setProfilePic(`https://localhost:7207/api/v1/Images/%20?folderName=CustomIdentityUser&imageName=${userProfile.profileImage}`);
      }
    }
  }, []);

  useEffect(() => {
    fetchServices();
    fetchEstablishments();
  }, []);

  const fetchServices = () => {
    apiService.getAll('/Services')
      .then(response => {
        if (response.data && response.data.items) {
          setServices(response.data.items);
        } else {
          console.error("Unexpected response structure:", response);
        }
      })
      .catch(error => {
        console.error("Error fetching services:", error);
      });
  };

  const fetchEstablishments = () => {
    const userProfileString = localStorage.getItem('userProfile');
    if (userProfileString) {
      const userProfile = JSON.parse(userProfileString);
      if (userProfile) {
        apiService.getAll(`/Establishments?ownerId=${userProfile.id}`)
          .then(response => {
            if (response.data && response.data.items) {
              const establishmentsData = response.data.items.map(establishment => ({
                id: establishment.id,
                userId: establishment.userId,
                businessName: establishment.businessName
              }));
              setEstablishments(establishmentsData);
            } else {
              console.error("Unexpected response structure:", response);
            }
          })
          .catch(error => {
            console.error("Error fetching establishments:", error);
          });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewService((prevService) => ({
          ...prevService,
          ServiceImage: reader.result,
          imageFile: file
        }));
        setImagePreviewUrl(reader.result);
        MySwal.fire({
          title: "Se agregó la imagen correctamente",
          imageUrl: reader.result,
          imageAlt: "Se agregó la imagen correctamente",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addOrUpdateService = () => {
    const formData = new FormData();
    formData.append("Id", editingServiceId);
    formData.append("EstablishmentId", newService.EstablishmentId);
    formData.append("ServiceName", newService.ServiceName);
    formData.append("Duration", newService.Duration);
    formData.append("Price", newService.Price);
    formData.append("ServiceImage", newService.ServiceImage);
    if (newService.imageFile) {
      formData.append("ImageFile", newService.imageFile);
    }

    if (editingServiceId) {
      apiService.update(`/Services/${editingServiceId}`, formData)
        .then(response => {
          fetchServices();
          resetForm();
        })
        .catch(error => {
          console.error("Error updating service:", error.response ? error.response.data : error.message);
        });
    } else {
      apiService.create('/Services', formData)
        .then(response => {
          fetchServices();
          resetForm();
        })
        .catch(error => {
          console.error("Error adding service:", error.response ? error.response.data : error.message);
        });
    }
  };

  const resetForm = () => {
    setNewService({
      EstablishmentId: "",
      ServiceName: "",
      Duration: "",
      Price: "",
      ServiceImage: "",
      imageFile: null,
    });
    setEditingServiceId(null);
    setImagePreviewUrl(loginImage);
  };

  const removeService = (id) => {
    apiService.delete(`/Services/${id}`)
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
      EstablishmentId: service.establishmentId,
      ServiceName: service.serviceName,
      Duration: service.duration,
      Price: service.price,
      ServiceImage: service.serviceImage,
      imageFile: null,
    });
    setEditingServiceId(service.id);
    setImagePreviewUrl(service.serviceImage ? `https://localhost:7207/api/v1/Images/%20%20?folderName=Service&imageName=${service.serviceImage}` : loginImage);
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

  const userProfile = JSON.parse(localStorage.getItem('userProfile'));

  return (
    <div className="service-job">
      <div className="business-owner-search-profile">
        <img src={profilePic} alt="Profile" className="servicejob_profile" />
        <h1>Gestión de Servicios</h1>
        <div className="business-owner-search-container">
          <RxMagnifyingGlass className="business-owner-search-icon" />
          <input type="text" placeholder="Buscar servicios" />
        </div>
      </div>
      <div className="create-service-form">
        <select
          name="EstablishmentId"
          value={newService.EstablishmentId}
          onChange={handleInputChange}
          style={{ color: '#000', backgroundColor: '#fff' }}
        >
          <option value="">Seleccionar Establecimiento</option>
          {establishments.filter(establishment => establishment.userId === userProfile.id).map(establishment => (
            <option
              key={establishment.id}
              value={establishment.id}
              style={{ color: '#000', backgroundColor: '#fff' }}
            >
              {establishment.businessName}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="ServiceName"
          placeholder="Nombre del Servicio"
          value={newService.ServiceName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Duration"
          placeholder="Duración"
          value={newService.Duration}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Price"
          placeholder="Precio"
          value={newService.Price}
          onChange={handleInputChange}
        />
        <div className="image-preview">
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          {imagePreviewUrl && (
            <div className="image-preview-container">
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
            <p>No hay servicios disponibles</p>
          </Col>
        ) : (
          services
            .filter(service => establishments.some(e => e.id === service.establishmentId && e.userId === userProfile.id))
            .map(service => (
              <Col key={service.id}>
                <Card style={cardStyle}>
                  <Card.Img
                    variant="top"
                    src={`https://localhost:7207/api/v1/Images/%20%20?folderName=Service&imageName=${service.serviceImage}`}
                    alt=""
                    style={imgStyle}
                  />
                  <Card.Body>
                    <Card.Title>{service.serviceName}</Card.Title>
                    <Card.Text>
                      Establecimiento: {establishments.find(e => e.id === service.establishmentId)?.businessName || 'Cargando...'}
                    </Card.Text>
                    <Card.Text>
                      Duración: {service.duration}
                    </Card.Text>
                    <Card.Text>
                      Precio: {service.price}
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

export default Servicejob;