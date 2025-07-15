import { useState } from 'react';
import Inicio from './Inicio.jsx';
import Registros from './Registros.jsx';
import Objetivos from './Objetivos.jsx';
import Estadisticas from './Estadisticas.jsx';
import Api from './Api.jsx';

const Menu = () => {
  const [seccionActiva, setSeccionActiva] = useState("Inicio");

  //Cambio Seccion
  const renderSeccion = () => {
    switch (seccionActiva) {
      case "Inicio":
        return <Inicio />;
      case "Registros":
        return <Registros />;
      case "Objetivos":
        return <Objetivos />;
      case "Estats":
        return <Estadisticas />;
      case "Api":
        return <Api />;
    }
  };

  return (
    <>
      <nav>
        <a href="#" onClick={() => setSeccionActiva("Inicio")}>Inicio</a> |
        <a href="#" onClick={() => setSeccionActiva("Registros")}>Registros</a> |
        <a href="#" onClick={() => setSeccionActiva("Objetivos")}>Logros o metas</a> |
        <a href="#" onClick={() => setSeccionActiva("Estats")}>Estadísticas</a> |
        <a href="#" onClick={() => setSeccionActiva("Api")}>Información</a>
      </nav>

      <div>
        <h2>Sección activa: {seccionActiva}</h2>
        {renderSeccion()}
      </div>
    </>
  );
};

export default Menu;
