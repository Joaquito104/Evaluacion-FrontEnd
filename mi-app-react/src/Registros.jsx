import { useState, useEffect } from 'react';
import './App.css';
import Estadisticas from './Estadisticas'; 

function Registros() {
  const [material, setMaterial] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState('');
  const [registros, setRegistros] = useState([]);
  const [estadisticas, setEstadisticas] = useState([
    {
      numero: 1,
      indicador: "Kg de residuos por hogar/mes",
      valorActual: 20, 
      valorMeta: 10,
      progreso: 0,
    },
    {
      numero: 2,
      indicador: "% de residuos reciclados",
      valorActual: 40, 
      valorMeta: 60,
      progreso: 0,
    },
    {
      numero: 3,
      indicador: "% de hogares compostando",
      valorActual: 30,
      valorMeta: 60,
      progreso: 0,
    },
    {
      numero: 4,
      indicador: "% de hogares con hábito regular",
      valorActual: 50,
      valorMeta: 80,
      progreso: 0,
    },
    {
      numero: 5,
      indicador: "Nº de puntos instalados",
      valorActual: 2,
      valorMeta: 10,
      progreso: 0,
    },
    {
      numero: 6,
      indicador: "Nº de campañas realizadas",
      valorActual: 2,
      valorMeta: 12,
      progreso: 0,
    },
    {
      numero: 7,
      indicador: "% de hogares con sensores",
      valorActual: 0,
      valorMeta: 20,
      progreso: 0,
    },
    {
      numero: 8,
      indicador: "Nº de hogares premiados",
      valorActual: 0,
      valorMeta: 100,
      progreso: 0,
    },
    {
      numero: 9,
      indicador: "% de nuevos capacitados",
      valorActual: "—",
      valorMeta: "100%",
      progreso: 0,
    },
    {
      numero: 10,
      indicador: "% de reducción",
      valorActual: "0%",
      valorMeta: "30% menos",
      progreso: 0,
    },
  ]);

  
  useEffect(() => {
    try {
      const storedRegistros = localStorage.getItem('registrosReciclaje');
      if (storedRegistros) {
        setRegistros(JSON.parse(storedRegistros));
      }
    } catch (error) {
      console.error("Error al cargar datos de Local Storage:", error);
    }
  }, []);

  
  useEffect(() => {
    try {
      localStorage.setItem('registrosReciclaje', JSON.stringify(registros));
      localStorage.setItem('estadisticas', JSON.stringify(estadisticas));
    } catch (error) {
      console.error("Error al guardar datos en Local Storage:", error);
    }
  }, [registros, estadisticas]);

  const handleSubmit = (e) => {
    e.preventDefault();

   
    if (!material || !cantidad || !fecha || parseFloat(cantidad) <= 0) {
      alert('Por favor, completa todos los campos correctamente. La cantidad debe ser un número positivo.');
      return;
    }

    const nuevoRegistro = {
      id: Date.now(),
      material,
      cantidad: parseFloat(cantidad),
      fecha,
    };


    setRegistros((prevRegistros) => {
      const nuevosRegistros = [...prevRegistros, nuevoRegistro];
      actualizarEstadisticas(nuevosRegistros); 
      return nuevosRegistros;
    });


    setMaterial('');
    setCantidad('');
    setFecha('');
  };


  const actualizarEstadisticas = (registros) => {
    let totalResiduos = 0;
    let residuosReciclados = 0;


    registros.forEach((registro) => {
      totalResiduos += registro.cantidad;
      if (['plastico', 'papel', 'vidrio', 'metal'].includes(registro.material)) {
        residuosReciclados += registro.cantidad;
      }
    });

 
    setEstadisticas((prevEstadisticas) => {
      return prevEstadisticas.map((item) => {
        if (item.indicador === "Kg de residuos por hogar/mes") {
          item.valorActual = totalResiduos / registros.length; 
          item.progreso = (item.valorActual / item.valorMeta) * 100;
        }
        if (item.indicador === "% de residuos reciclados") {
          item.valorActual = (residuosReciclados / totalResiduos) * 100;
          item.progreso = item.valorActual;
        }
        return item;
      });
    });
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
            name="material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          >
            <option value="">Selecciona un material</option>
            <option value="plastico">Plástico</option>
            <option value="papel">Papel</option>
            <option value="vidrio">Vidrio</option>
            <option value="metal">Metal</option>
            <option value="organico">Orgánico</option>
            <option value="otro">Otro</option>
          </select>

          <label htmlFor="cantidad">Cantidad Estimada (kg/unidades):</label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            min="0"
            step="0.1"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder="Ej: 1.5"
          />

          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />

          <button type="submit">Agregar Registro</button>
        </form>
      </section>

      <section className="lista-registros">
        <h2>Mis Registros de Reciclaje</h2>
        {registros.length === 0 ? (
          <p>Aún no hay registros. ¡Empieza a reciclar!</p>
        ) : (
          <ul>
            {registros.map((registro) => (
              <li key={registro.id}>
                Material: {registro.material}, Cantidad: {registro.cantidad} kg, Fecha: {registro.fecha}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="estadisticas">
        <h2>Estadísticas de Reciclaje</h2>
        <Estadisticas estadisticas={estadisticas} />
      </section>
    </div>
  );
}

export default Registros;
