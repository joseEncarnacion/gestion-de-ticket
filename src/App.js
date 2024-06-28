import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Registro from "./components/auth/Registro";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
      <div className="App-header">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Registro" element={<Registro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;