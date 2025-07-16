import { useState, useEffect } from 'react';
import './App.css';

function Registros() {
  const [material, setMaterial] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState('');
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const storedRegistros = localStorage.getItem('reciclaje');
    if (storedRegistros) {
      setRegistros(JSON.parse(storedRegistros));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!material || !cantidad || !fecha || parseFloat(cantidad) <= 0) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const nuevoRegistro = {
      id: Date.now(),
      tipo: material,
      cantidad: parseFloat(cantidad),
      fecha,
    };

    const registrosActualizados = [...registros, nuevoRegistro];

    setRegistros(registrosActualizados);
    localStorage.setItem('reciclaje', JSON.stringify(registrosActualizados));

    setMaterial('');
    setCantidad('');
    setFecha('');
  };

  return (
    <div className="app-container">
      <h1>Gestión de Reciclaje en Hogares</h1>

      <section className="registro-form">
        <h2>Registrar Nuevo Reciclaje</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="material">Tipo de Material:</label>
          <select
            id="material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          >
            <option value="">Selecciona un material</option>
            <option value="Plástico">Plástico</option>
            <option value="Papel">Papel</option>
            <option value="Vidrio">Vidrio</option>
            <option value="Metal">Metal</option>
            <option value="Orgánico">Orgánico</option>
            <option value="Otro">Otro</option>
          </select>

          <label htmlFor="cantidad">Cantidad (kg):</label>
          <input
            type="number"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            min="0"
            step="0.1"
            placeholder="Ej: 1.5"
          />

          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />

          <button type="submit">Agregar Registro</button>
        </form>
      </section>

      <section className="lista-registros">
        <h2>Mis Registros de Reciclaje</h2>
        {registros.length === 0 ? (
          <p>Aún no hay registros.</p>
        ) : (
          <ul>
            {registros.map((registro) => (
              <li key={registro.id}>
                {registro.tipo} — {registro.cantidad} kg — {registro.fecha}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Registros;
