import { useState } from 'react';
import Inicio from './Inicio.jsx';
import Registros from './Registros.jsx';
import Metas from './Metas.jsx';
import Estadisticas from './Estadisticas.jsx';
import Api from './Api.jsx';

const Menu = () => {
  const [seccionActiva, setSeccionActiva] = useState("Inicio");

  const renderSeccion = () => {
    switch (seccionActiva) {
      case "Inicio":
        return <Inicio />;
      case "Registros":
        return <Registros />;
      case "Metas":
        return <Metas />;
      case "Estadísticas":
        return <Estadisticas />;
      case "Información":
        return <Api />;
      default:
        return <Inicio />;
    }
  };

  // Elimina tildes y pasa a minúsculas para usar en la clase CSS:
  const normalizarClase = (texto) =>
    texto
      .toLowerCase()
      .replace(/á/g, "a")
      .replace(/í/g, "i")
      .replace(/ó/g, "o")
      .replace(/é/g, "e")
      .replace(/ú/g, "u")
      .replace(/\s+/g, "");

  return (
    <>
      <nav>
        <a href="#" onClick={() => setSeccionActiva("Inicio")}>Inicio</a> |
        <a href="#" onClick={() => setSeccionActiva("Registros")}>Registros</a> |
        <a href="#" onClick={() => setSeccionActiva("Metas")}>Metas</a> |
        <a href="#" onClick={() => setSeccionActiva("Estadísticas")}>Estadísticas</a> |
        <a href="#" onClick={() => setSeccionActiva("Información")}>Información</a>
      </nav>

      <div className={`seccion-container ${normalizarClase(seccionActiva)}`}>
        <h2><strong>Usted se encuentra: {seccionActiva}</strong></h2>
        {renderSeccion()}
      </div>
    </>
  );
};

export default Menu;
