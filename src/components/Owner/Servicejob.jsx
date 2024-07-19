import React, { useState, useRef } from "react";
import "./Servicejob.css";
import { RxMagnifyingGlass } from "react-icons/rx";

const ServiceJob = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    establishment: "",
    serviceName: "",
    serviceImage: "",
    duration: "",
    price: "",
  });
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewService({ ...newService, serviceImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addService = () => {
    setServices([...services, newService]);
    setNewService({
      establishment: "",
      serviceName: "",
      serviceImage: "",
      duration: "",
      price: "",
    });
  };

  const removeService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
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
          name="establishment"
          placeholder="Establecimiento"
          value={newService.establishment}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="serviceName"
          placeholder="Nombre del Servicio"
          value={newService.serviceName}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="duration"
          placeholder="Duración minutos"
          value={newService.duration}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={newService.price}
          onChange={handleInputChange}
        />
        <div className="file-input-container">
          <input
            type="file"
            name="serviceImage"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <button className="custom-file-upload" onClick={handleFileInputClick}>
            Subir Imagen
          </button>
          {newService.serviceImage && (
            <img
              src={newService.serviceImage}
              alt="Preview"
              className="image-preview"
            />
          )}
        </div>
        <button onClick={addService}>Crear Servicio</button>
      </div>
      <div className="service-list">
        {services.map((service, index) => (
          <div key={index} className="service-item">
            <p>Establecimiento: {service.establishment}</p>
            <p>Nombre: {service.serviceName}</p>
            <p>Duración: {service.duration} minutos</p>
            <p>Precio: ${service.price}</p>
            {service.serviceImage && (
              <img src={service.serviceImage} alt={service.serviceName} />
            )}
            <div className="service-actions">
              <button
                onClick={() => alert(`Modificando ${service.serviceName}`)}
              >
                Modificar
              </button>
              <button onClick={() => removeService(index)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceJob;
