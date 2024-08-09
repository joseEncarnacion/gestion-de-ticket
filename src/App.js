
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Registro from "./components/auth/Registro";
import Servicio from "./components/pages/Servicio";
import HomeInitialAUTH from "./components/pages/HomeAuth";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import BusinessOwner from "./components/Owner/businessowner";
import ServiceJob from "./components/Owner/Jobservi/Servicejob";
import Establishments from "./components/Owner/Jobestablis/Establishments";
import ImageDisplay from "./components/pages/ImageDisplay";
import ContratarEmpleado from "./components/EmployeesView/ContratarEmpleado";





function App() {
  return (
    <Router>
      <div className="App-header">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/HomeInitialAUTH" element={<HomeInitialAUTH />} />
          <Route path="/Servicio" element={<Servicio />} />
          <Route path="/BusinessOwner" element={<BusinessOwner />} />
          <Route path="/ServiceJob" element={<ServiceJob/>}/>
          <Route path="/Establishments" element={<Establishments/>}/>
          <Route path="ImageDisplay" element={<ImageDisplay/>}/>
          <Route path="/employee" element={<ContratarEmpleado/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
