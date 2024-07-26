import React, { useState, useRef, useEffect } from "react";
import apiService from "../../../api/apiService";
import "./Establishments.css";
import { RxMagnifyingGlass } from "react-icons/rx";

const Establishments = () => {
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

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    apiService.getAll('/Establishments')
      .then(response => {
        setServices(response.data.items);
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
      };
      reader.readAsDataURL(file);
    }
  };

const addOrUpdateService = () => {
  const formData = new FormData();
  formData.append("Id", editingServiceId);  // Include the ID field
  formData.append("UserId", newService.userId);
  formData.append("BusinessName", newService.businessName);
  formData.append("Location", newService.location);
  formData.append("WorkingHours", newService.workingHours);
  formData.append("Description", newService.description);
  formData.append("ProfileImage", newService.profileImage);  // Include the ProfileImage field
  if (newService.imageFile) {
    formData.append("ImageFile", newService.imageFile);
  }

  // Print formData content to console for debugging
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
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
  };

  return (
    <div className="service-job">
      <div className="business-owner-search-profile">
        <h1>Gestión de Servicios</h1>
        <div className="business-owner-search-container">
          <RxMagnifyingGlass className="business-owner-search-icon" />
          <input type="text" placeholder="Buscar servicios" />
        </div>
      </div>
      <div className="create-service-form">
        <input
          type="text"
          name="userId"
          placeholder="ID de Usuario"
          value={newService.userId}
          onChange={handleInputChange}
        />
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
        <div className="file-input-container">
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <button className="custom-file-upload" onClick={handleFileInputClick}>
            Subir Imagen
          </button>
          {newService.profileImage && (
            <img
              src={newService.profileImage}
              alt="Preview"
              className="image-preview"
            />
          )}
        </div>
        <button onClick={addOrUpdateService}>
          {editingServiceId ? "Actualizar Servicio" : "Crear Servicio"}
        </button>
      </div>
      <div className="service-list">
        {services.map(service => (
          <div key={service.id} className="service-item">
            <p>ID de Usuario: {service.userId}</p>
            <p>Nombre: {service.businessName}</p>
            <p>Ubicación: {service.location}</p>
            <p>Horas de Trabajo: {service.workingHours}</p>
            <p>Descripción: {service.description}</p>
            {service.profileImage && (
              <img src={service.profileImage} alt={service.businessName} />
            )}
            <div className="service-actions">
              <button onClick={() => editService(service)}>
                Modificar
              </button>
              <button onClick={() => removeService(service.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Establishments;
