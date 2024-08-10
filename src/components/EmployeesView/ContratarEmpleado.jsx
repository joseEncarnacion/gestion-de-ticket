import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import "./ContratarEmpleado.css";

const ContratarEmpleado = () => {
    const [show, setShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [searchTerm, setSearchTerm] = useState(''); 
    
    const handleClose = () => setShow(false);
    const handleShow = (user) => {
      setSelectedUser(user);
      setShow(true);
    };

  const clientes = [
    {
      id: "0f52a9fa-4a94-4a9a-b44b-9d58ff0b46f2",
      firstName: "usuario01",
      lastName: "prueba01",
      userName: "pr01",
      email: "pr01@gmail.com",
      profileImage: "6767262b-e5b5-40c5-88bd-5deffbf4a860.jpeg",
    },
    {
      id: "19b4d0ba-5014-49d4-9b25-0c63e6139e4f",
      firstName: "Jose",
      lastName: "IA",
      userName: "jopr",
      email: "2008000485@itla.edu.do",
      profileImage: "45b5a41f-b992-4a25-a5ea-cbdc12279e35.png",
    },
    {
      id: "7bfc5c75-a9fa-4623-8e0c-4c1a2dc8cbda",
      firstName: "John",
      lastName: "Tie",
      userName: "cliente",
      email: "cliente@gmail.com",
      profileImage: "",
    },
    // ...otros clientes.... aqui simulo los clientes que vienen desde https://localhost:7207/api/v1/Account/users
  ];

   // Filtra los clientes hay un endpoint en Account tipo get que puedes utilizar para filtrar por username 
   const filteredClientes = clientes.filter(cliente =>
    cliente.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
         {/* Input para búsqueda  aqui puedes setiar el parametro de userName de la api*/}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por Username..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            background: 'linear-gradient(to right, #dddd68, #ffffff)',
            border: '2px solid #cac531',
          }}
        />
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-2">
       
          {clientes.map((cliente) => (
            <div key={cliente.id} className="col-md-4">
              <Card className="mb-4">
                <Card.Img
                  variant="top"
                  className="card-img-topE"
                  src={cliente.profileImage || "placeholder-image-url"}
                  alt="Profile Image"
                />
                <Card.Body>
                  <Card.Title>
                    {cliente.firstName} {cliente.lastName}
                  </Card.Title>
                  <Card.Text>
                    <strong>Username:</strong> {cliente.userName}
                    <br />
                    <strong>Email:</strong> {cliente.email}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button
                    style={{
                      backgroundColor: "#000000",
                      color: "#fff",
                      borderColor: "#000000",
                    }}
                    onClick={() => handleShow(cliente)}
                  >
                    Contratar
                  </Button>
                </Card.Footer>
              </Card>
            </div>
          ))}
        
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Información del Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>ID:</strong> {selectedUser.id}
          </p>
          <p>
            <strong>Username:</strong> {selectedUser.userName}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "#000000",
              color: "#fff",
              borderColor: "#000000",
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

export default ContratarEmpleado;
