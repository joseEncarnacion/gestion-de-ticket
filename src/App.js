
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
import EmployeesManagement from "./components/Employee/EmployeesManagement";
import JobApplicationsManagement from "./components/Employee/JobApplicationsManagement";





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
          <Route path="/employees" element={<EmployeesManagement/>}/>
          <Route path="/job-applications" element={<JobApplicationsManagement/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
