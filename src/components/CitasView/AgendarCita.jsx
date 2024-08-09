import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import './AgendarCita.css'; 

const AgendarCita = () => {
  const [show, setShow] = useState(false);
  const [selectedService, setSelectedService] = useState({});
  
  const handleClose = () => setShow(false);
  const handleShow = (service) => {
    setSelectedService(service);
    setShow(true);
  };

  const services = [
    {
      id: 1,
      establishmentId: 1003,
      serviceName: "Corte adulto normal",
      serviceImage: "45b5a41f-b992-4a25-a5ea-cbdc12279e35.png",
      duration: 1,
      price: 500
    },
    {
        id: 2,
        establishmentId: 1004,
        serviceName: "Lavar Carro",
        serviceImage: "45b5a41f-b992-4a25-a5ea-cbdc12279e35.png",
        duration: 2,
        price: 400
      },
      {
        id: 3,
        establishmentId: 1002,
        serviceName: "Manicure y Pedicure",
        serviceImage: "45b5a41f-b992-4a25-a5ea-cbdc12279e35.png",
        duration: 1.5,
        price: 300
      },
      {
        id: 4,
        establishmentId: 1005,
        serviceName: "Corte de cabello infantil",
        serviceImage: "45b5a41f-b992-4a25-a5ea-cbdc12279e35.png",
        duration: 0.5,
        price: 200
      },
      {
        id: 5,
        establishmentId: 1003,
        serviceName: "Masaje relajante",
        serviceImage: "45b5a41f-b992-4a25-a5ea-cbdc12279e35.png",
        duration: 1.5,
        price: 600
      }
    // Recuerda que debes usar el endpont de listar los servicio y en la modar utilizar 
    //el endpont de crear cita(apointment) 
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        {services.map((service) => (
          <div key={service.id} className="col-md-4">
            <Card className="mb-4">
              <div className="card-img-top">
                <img 
                  src={service.serviceImage || "path-to-gray-placeholder.jpg"} 
                  alt={service.serviceName} 
                />
              </div>
              <Card.Body>
                <Card.Title>{service.serviceName}</Card.Title>
                <Card.Text>
                  <strong>Duración:</strong> {service.duration} horas<br />
                  <strong>Precio:</strong> ${service.price}<br />
                  <strong>Establecimiento ID:</strong> {service.establishmentId}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button
                  style={{
                    backgroundColor: '#000000',
                    color: '#fff',
                    borderColor: '#000000'
                  }}
                  onClick={() => handleShow(service)}
                >
                  Agendar Cita
                </Button>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Establishment ID:</strong> {selectedService.establishmentId}</p>
          <p><strong>Service ID:</strong> {selectedService.id}</p>
          <p><strong>Employee ID:</strong> (ID del empleado aquí)</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: '#000000',
              color: '#fff',
              borderColor: '#000000'
            }}
            onClick={handleClose}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AgendarCita;
