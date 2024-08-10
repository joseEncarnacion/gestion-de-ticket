  import React, { useState, useRef, useEffect } from "react";
  import apiService from "../../../api/apiService";
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
    const [filteredServices, setFilteredServices] = useState([]); // Nueva variable de estado para los servicios filtrados
    const [searchTerm, setSearchTerm] = useState(""); // Nueva variable de estado para el término de búsqueda
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

    useEffect(() => {
      // Filtrar servicios según el término de búsqueda
      const filtered = services.filter(service =>
        service.businessName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredServices(filtered);
    }, [searchTerm, services]);

    const fetchServices = () => {
      apiService.getAll('/Establishments')
        .then(response => {
          console.log("Servicios obtenidos:", response.data.items);
          const userServices = response.data.items.filter(service => service.userId === userId);
          console.log("Servicios del usuario:", userServices);
          setServices(userServices);
          setFilteredServices(userServices); // Inicialmente, todos los servicios están filtrados
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
          <div className="wrap-input-18">
        <div className="search">
          <div className="business-owner-search-container">
        
            <input
              type="text"
              placeholder="Buscar Establecimientos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el término de búsqueda
            />
          </div>
        </div>
      
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
            {!imagePreviewUrl && (
              <div className="image-previewss" onClick={handleFileInputClick}>
                <img src={loginImage} alt="Default" className="reduced-size" />
              </div>
            )}
          </div>
          <button onClick={addOrUpdateService}>
            {editingServiceId ? "Actualizar" : "Crear"} Establecimiento
          </button>
        </div>
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredServices.map((service) => (
            <Col key={service.id}>
              <Card style={cardStyle}>
                <div className="card-image-container">
                  <Card.Img
                    variant="top"
                    src={`https://localhost:7207/api/v1/Images/%20?folderName=Establishment&imageName=${service.profileImage}`}
                    alt={service.businessName}
                    style={imgStyle}
                  />
                </div>
                <Card.Body>
                  <Card.Title>{service.businessName}</Card.Title>
                  <Card.Text style={cardTextStyle}>Ubicación: {service.location}</Card.Text>
                  <Card.Text style={cardTextStyle}>Horas de Trabajo: {service.workingHours}</Card.Text>
                  <Card.Text style={cardTextStyle}>{service.description}</Card.Text>
                  <button onClick={() => editService(service)}>Editar</button>
                  <button onClick={() => removeService(service.id)}>Eliminar</button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  export default Establishments;
