import React, { useState, useRef, useEffect } from "react";
import apiService from "../../../api/apiService";
import "./Servicejob.css";
import { RxMagnifyingGlass } from "react-icons/rx";

const Servicejob = () => {
  const [services, setServices] = useState([]);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [newService, setNewService] = useState({
    EstablishmentId: "",
    ServiceName: "",
    Duration: "",
    Price: "",
    ServiceImage: "",
    imageFile: null
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    apiService.getAll('/Services')
      .then(response => {
        console.log("API response:", response); // Depuración
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
          ServiceImage: reader.result,
        }));
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
      imageFile: null
    });
    setEditingServiceId(null);
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
          name="EstablishmentId"
          placeholder="ID de Establecimiento"
          value={newService.EstablishmentId}
          onChange={handleInputChange}
        />
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
          {newService.ServiceImage && (
            <img
              src={newService.ServiceImage}
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
        {services.length === 0 ? (
          <p>No hay servicios disponibles</p>
        ) : (
          services.map(service => (
            <div key={service.id} className="service-item">
              <p>ID de Establecimiento: {service.establishmentId}</p>
              <p>Nombre del Servicio: {service.serviceName}</p>
              <p>Duración: {service.duration} minutos</p>
              <p>Precio: ${service.price}</p>
              {service.serviceImage && (
                <img src={`https://localhost:7207/api/v1/Services/images/${service.serviceImage}`} alt={service.serviceName} />
              )}
              <div className="service-actions">
                <button onClick={() => editService(service)}>Modificar</button>
                <button onClick={() => removeService(service.id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Servicejob;
