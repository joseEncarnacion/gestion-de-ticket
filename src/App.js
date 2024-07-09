
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Registro from "./components/auth/Registro";
import HomeInitialAUTH from "./components/pages/HomeAuth"; // Importa el componente
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
      <div className="App-header">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/HomeInitialAUTH" element={<HomeInitialAUTH />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
