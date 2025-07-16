import { useState } from 'react';
import Inicio from './Inicio.jsx';
import Registros from './Registros.jsx';
import Metas from './Metas.jsx';
import Estadisticas from './Estadisticas.jsx';
import Api from './Api.jsx';

const Menu = () => {
  const [seccionActiva, setSeccionActiva] = useState("Inicio");

  //Cambio Seccion
  const renderSeccion = () => {
    switch (seccionActiva) {
      case "Inicio":
        return <Inicio />; //Se mantiene o vuelve al menu
      case "Registros":
        return <Registros />;
      case "Metas":
        return <Metas/>;
      case "Estadisticas":
        return <Estadisticas />;
      case "Información":
        return <Api />;
    }
  };

  return (
    <>

      <nav>
        <a href="#" onClick={() => setSeccionActiva("Inicio")}>Inicio</a> |
        <a href="#" onClick={() => setSeccionActiva("Registros")}>Registros</a> |
        <a href="#" onClick={() => setSeccionActiva("Metas")}>Metas</a> |
        <a href="#" onClick={() => setSeccionActiva("Estadisticas")}>Estadísticas</a> |
        <a href="#" onClick={() => setSeccionActiva("Información")}>Información</a>
      </nav>

      <div>
        <h2><strong>Usted se encuentra: {seccionActiva}</strong></h2>
        {renderSeccion()}
      </div>
    </>
  );
};

export default Menu;
