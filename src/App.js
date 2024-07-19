
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Registro from "./components/auth/Registro";
import Servicio from "./components/pages/Servicio";
import HomeInitialAUTH from "./components/pages/HomeAuth"; // Importa el componente
import AuthState from "./context/autenticacion/authState";
import AlertState from "./context/alert";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {

  console.log(process.env.REACT_APP_BACKEND_URL);

  return (
    <AlertState>
      <AuthState>
        <Router>
          <div className="App-header">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Registro" element={<Registro />} />
              <Route path="/HomeInitialAUTH" element={<HomeInitialAUTH />} />
              <Route path="/Servicio" element={<Servicio />} />
            </Routes>
          </div>
        </Router>
      </AuthState>
    </AlertState>
  );
}

export default App;
