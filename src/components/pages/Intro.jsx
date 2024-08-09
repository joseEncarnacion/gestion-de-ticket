// src/components/pages/Intro.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import './intro.css';
import Appft from '../Assets/iphones.png';
import logo from '../Assets/turnoexpress.png';
import appstore from '../Assets/logo-apple.png';
import googleplay from '../Assets/logo-google.png';

const Intro = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="intro">
      <header className="intro-header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div className="auth-buttons">
            <button className="btn" onClick={() => handleNavigation('/login')}>Iniciar Sesión</button>
            <button className="btn" onClick={() => handleNavigation('/Registro  ')}>Registrarme</button>
          </div>
        </div>
        <div className="container">
          <div className="content">
            <div className="text-content">
              <h1 className="title">Tu Aplicación Perfecta</h1>
              <p className="subtitle">Nuestra aplicación está aquí para empoderarte en tu búsqueda de conocimiento, en cualquier momento y lugar.</p>
              <h6 className="download-title">Obtén la app</h6>
              <div className="button-group">
                <button className="btn-app-store">
                  <img src={appstore} alt="App Store" />
                  App Store
                </button>
                <button className="btn-google-play">
                  <img src={googleplay} alt="Google Play" />
                  Google Play
                </button>
              </div>
            </div>
            <img src={Appft} alt="App Preview" className="app-preview" />
          </div>
        </div>
      </header>
      <div className="intro-details">
        <div>
          <h3 className="details-title">Aplicación de Aprendizaje</h3>
          <p className="details-text">Descarga nuestra aplicación para sumergirte en una vasta biblioteca de cursos, tutoriales y materiales de estudio sobre una amplia gama de temas, desde programación y aprendizaje de idiomas hasta desarrollo personal y más.</p>
        </div>
      </div>
      
      <main className="intro-content">
        // crea una sección de contenido hablando de nuestro proyecto y cómo puede beneficiar a los usuarios usa los datos adjuntos en el pdf para completar esta sección recuesdq que esto es como la home pague del servicion donde podes saber aserca de esta, registrarse o descargar la app 
        <section className="screenshots-section">
          <h2 className="screenshots-title">Capturas de Pantalla</h2>
          <div className="screenshots">
            <img src={Appft} alt="Web Screenshot" className="screenshot" />
            <img src={Appft} alt="App Screenshot" className="screenshot" />
          </div>
        </section>
      </main>
      <footer className="intro-footer">
        <p>&copy; 2024 Nombre de la Web. Todos los derechos reservados.</p>
        <div className="download-footer">
          <button className="btn-app-store">
            <img src={appstore} alt="App Store" />
            App Store
          </button>
          <button className="btn-google-play">
            <img src={googleplay} alt="Google Play" />
            Google Play
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Intro;
