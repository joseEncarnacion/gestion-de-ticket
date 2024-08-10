import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FaRegUser } from 'react-icons/fa';
import { RxMagnifyingGlass } from 'react-icons/rx';
import apiService from '../../api/apiService';
import './businessowner.css';
import logo from '../Assets/turnoexpress.png';

const MySwal = withReactContent(Swal);

const BusinessOwner = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const [establishments, setEstablishments] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredEstablishments, setFilteredEstablishments] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [newService, setNewService] = useState({
    EstablishmentId: '',
    ServiceName: '',
    Duration: '',
    Price: '',
    ServiceImage: '',
    imageFile: null,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile && userProfile.profileImage) {
      setProfilePic(`https://localhost:7207/api/v1/Images/%20?folderName=CustomIdentityUser&imageName=${userProfile.profileImage}`);
    }
    fetchEstablishments();
    fetchServices();
  }, []);

  useEffect(() => {
    // Filtrar establecimientos
    setFilteredEstablishments(
      establishments.filter(establishment =>
        establishment.businessName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    // Filtrar servicios
    setFilteredServices(
      services.filter(service =>
        service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, establishments, services]);

  const fetchEstablishments = () => {
    apiService.getAll('/Establishments')
      .then(response => {
        const userId = JSON.parse(localStorage.getItem('userProfile')).id;
        const userEstablishments = response.data.items.filter(establishment => establishment.userId === userId);
        setEstablishments(userEstablishments);
      })
      .catch(error => {
        console.error('Error fetching establishments:', error);
      });
  };

  const fetchServices = () => {
    apiService.getAll('/Services')
      .then(response => {
        const userId = JSON.parse(localStorage.getItem('userProfile')).id;
        const userServices = response.data.items.filter(service =>
          establishments.some(establishment => establishment.id === service.establishmentId)
        );
        setServices(userServices);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  };

  const removeService = id => {
    apiService.delete(`/Services/${id}`)
      .then(() => {
        fetchServices();
        MySwal.fire('Servicio eliminado', '', 'success');
      })
      .catch(error => {
        console.error('Error deleting service:', error);
      });
  };

  const editService = service => {
    setNewService({
      EstablishmentId: service.establishmentId,
      ServiceName: service.serviceName,
      Duration: service.duration,
      Price: service.price,
      ServiceImage: service.serviceImage,
      imageFile: null,
    });
    setEditingServiceId(service.id);
    setImagePreviewUrl(service.serviceImage ? `https://localhost:7207/api/v1/Images/%20?folderName=Service&imageName=${service.serviceImage}` : '');
  };

  const addOrUpdateService = () => {
    const formData = new FormData();
    formData.append('Id', editingServiceId);
    formData.append('EstablishmentId', newService.EstablishmentId);
    formData.append('ServiceName', newService.ServiceName);
    formData.append('Duration', newService.Duration);
    formData.append('Price', newService.Price);
    formData.append('ServiceImage', newService.ServiceImage);
    if (newService.imageFile) {
      formData.append('ImageFile', newService.imageFile);
    }

    if (editingServiceId) {
      apiService.update(`/Services/${editingServiceId}`, formData)
        .then(() => {
          fetchServices();
          resetForm();
        })
        .catch(error => {
          console.error('Error updating service:', error.response ? error.response.data : error.message);
        });
    } else {
      apiService.create('/Services', formData)
        .then(() => {
          fetchServices();
          resetForm();
        })
        .catch(error => {
          console.error('Error adding service:', error.response ? error.response.data : error.message);
        });
    }
  };

  const resetForm = () => {
    setNewService({
      EstablishmentId: '',
      ServiceName: '',
      Duration: '',
      Price: '',
      ServiceImage: '',
      imageFile: null,
    });
    setEditingServiceId(null);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const logout = () => {
    navigate('/');
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewService(prevService => ({
          ...prevService,
          ServiceImage: reader.result,
          imageFile: file,
        }));
      };
      reader.readAsDataURL(file);
    }
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
  const navigateToServiceJob = (service) => {
    navigate('/servicejob', { state: { service } });
};

const navigateToEstablishments = (establishment) => {
    navigate('/establishments', { state: { establishment } });
};



  const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  return (
    <div className="business-owner">
      <div className="business-owner-header-content">
        <div className="logo">
          <img src={logo} alt="Barbería Corte Perfecto" />
          <span>Filtro de ubicación</span>
        </div>
        <div className="search-profile">
          <div className="search-container">
            <RxMagnifyingGlass className='search-icon' />
            <input
              type="text"
              placeholder="Buscar establecimientos y servicios"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="profile" onClick={toggleProfileMenu}>
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="profile-pic" />
            ) : (
              <FaRegUser className="icon" />
            )}
            <span>Mi Perfil</span>
            <span>▼</span>
          </div>
          {profileMenuOpen && (
            <div className="profile-menu">
              <div className="profile-option" onClick={() => navigate('/Configprofiles')}>
                Configurar Perfil
              </div>
              <div className="profile-option" onClick={logout}>
                Cerrar Sesión
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="business-owner-services">
        <h1>Bienvenido</h1>
        <div className="business-owner-buttons">
          <Link to="/servicejob"><button>Servicios</button></Link>
          <button>Vistas de turno</button>
          <button>Empleados</button>
          <Link to="/Establishments"><button>Establecimiento</button></Link>
        </div>
      </div>

      <div className="business-owner-featured">
        <h3>Establecimientos</h3>
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredEstablishments.length === 0 ? (
            <Col>
              <p>No hay establecimientos disponibles</p>
            </Col>
          ) : (
            filteredEstablishments.map(establishment => (
              <Col key={establishment.id}>
                <Card style={cardStyle}>
                  <div className="card-image-container">
                    <Card.Img
                      variant="top"
                      src={`https://localhost:7207/api/v1/Images/%20?folderName=Establishment&imageName=${establishment.profileImage}`}
                      alt={establishment.businessName}
                      style={imgStyle}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{establishment.businessName}</Card.Title>
                    <button onClick={() => navigateToEstablishments(establishment)}>Editar</button>

                    <button onClick={() => removeService(establishment.id)}>Eliminar</button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>

        <h3>Servicios</h3>
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredServices.length === 0 ? (
            <Col>
              <p>No hay servicios disponibles</p>
            </Col>
          ) : (
            filteredServices.map(service => (
              <Col key={service.id}>
                <Card style={cardStyle}>
                  <div className="card-image-container">
                    <Card.Img
                      variant="top"
                      src={`https://localhost:7207/api/v1/Images/%20?folderName=Service&imageName=${service.serviceImage}`}
                      alt={service.serviceName}
                      style={imgStyle}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{service.serviceName}</Card.Title>
                    <Card.Text>
                      Establecimiento: {establishments.find(e => e.id === service.establishmentId)?.businessName || 'Cargando...'}
                    </Card.Text>
                   
                    <button onClick={() => navigateToServiceJob(service)}>Editar</button>
                    <button onClick={() => removeService(service.id)}>Eliminar</button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </div>
    </div>
  );
};

export default BusinessOwner;
