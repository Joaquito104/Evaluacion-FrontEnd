import React, { useState } from 'react';

const Menu = () => {
  const [state, setState] = useState("Inicio");

  const handleClick = (nombreSeccion) => {
    setState(nombreSeccion);
    console.log("Sección seleccionada:", nombreSeccion);
  };

  return (
    <>
      <nav>
        <a href="#" onClick={() => handleClick("Inicio")}>Inicio</a> |
        <a href="#" onClick={() => handleClick("Registros")}>Registros</a> |
        <a href="#" onClick={() => handleClick("Objetivos")}>Logros o metas</a> |
        <a href="#" onClick={() => handleClick("Estats")}>Estadísticas</a> |
        <a href="#" onClick={() => handleClick("Api")}>Información</a>
      </nav>

      <div>
        <h2>Sección activa: {state}</h2>
      </div>
    </>
  );
};

export default Menu;
