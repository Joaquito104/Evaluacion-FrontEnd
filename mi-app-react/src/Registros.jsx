import { useState, useEffect } from 'react';
import './App.css';

function Registros() {
  const [material, setMaterial] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState('');
  const [registros, setRegistros] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editMaterial, setEditMaterial] = useState('');
  const [editCantidad, setEditCantidad] = useState('');
  const [editFecha, setEditFecha] = useState('');

  const [mostrarRegistros, setMostrarRegistros] = useState(false);

  useEffect(() => {
    const storedRegistros = localStorage.getItem('reciclaje');
    if (storedRegistros) {
      setRegistros(JSON.parse(storedRegistros));
    }
  }, []);

  const guardarRegistros = (nuevosRegistros) => {
    setRegistros(nuevosRegistros);
    localStorage.setItem('reciclaje', JSON.stringify(nuevosRegistros));
  };

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

    guardarRegistros([...registros, nuevoRegistro]);
    setMaterial('');
    setCantidad('');
    setFecha('');
  };

  const iniciarEdicion = (registro) => {
    setEditId(registro.id);
    setEditMaterial(registro.tipo);
    setEditCantidad(registro.cantidad);
    setEditFecha(registro.fecha);
  };

  const cancelarEdicion = () => {
    setEditId(null);
    setEditMaterial('');
    setEditCantidad('');
    setEditFecha('');
  };

  const guardarEdicion = (id) => {
    if (!editMaterial || !editCantidad || !editFecha || parseFloat(editCantidad) <= 0) {
      alert('Por favor, completa todos los campos correctamente en la edición.');
      return;
    }

    const registrosActualizados = registros.map((reg) =>
      reg.id === id
        ? { ...reg, tipo: editMaterial, cantidad: parseFloat(editCantidad), fecha: editFecha }
        : reg
    );

    guardarRegistros(registrosActualizados);
    cancelarEdicion();
  };

  const eliminarRegistro = (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este registro?')) {
      guardarRegistros(registros.filter((reg) => reg.id !== id));
    }
  };

  const eliminarTodos = () => {
    if (window.confirm('¿Seguro que quieres eliminar TODOS los registros?')) {
      guardarRegistros([]);
    }
  };

  return (
    <div className="app-container" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Gestión de Reciclaje en Hogares</h1>

      <section className="registro-form" style={{ marginBottom: '2rem' }}>
        <h2>Registrar Nuevo Reciclaje</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}
        >
          <label style={{ fontWeight: '700', fontSize: '1.3rem', minWidth: '140px', textAlign: 'right' }}>
            Tipo de Material:
          </label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            style={{ padding: '6px', flexGrow: 1, minWidth: '180px' }}
          >
            <option value="">Selecciona un material</option>
            <option value="Plástico">Plástico</option>
            <option value="Papel">Papel</option>
            <option value="Vidrio">Vidrio</option>
            <option value="Metal">Metal</option>
            <option value="Orgánico">Orgánico</option>
            <option value="Otro">Otro</option>
          </select>

          <label style={{ fontWeight: '700', fontSize: '1.3rem', minWidth: '140px', textAlign: 'right' }}>
            Cantidad (kg):
          </label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            min="0"
            step="0.1"
            placeholder="Ej: 1.5"
            style={{ padding: '6px', width: '100px' }}
          />

          <label style={{ fontWeight: '700', fontSize: '1.3rem', minWidth: '140px', textAlign: 'right' }}>
            Fecha:
          </label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            style={{ padding: '6px', flexGrow: 1, minWidth: '160px' }}
          />

          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white' }}>
            Agregar Registro
          </button>
        </form>
      </section>

      <section className="lista-registros">
        {registros.length === 0 ? (
          <p>Aún no hay registros.</p>
        ) : (
          <>
            <button
              onClick={() => setMostrarRegistros(!mostrarRegistros)}
              style={{
                marginBottom: '10px',
                backgroundColor: '#17a2b8',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
            >
              {mostrarRegistros ? 'Ocultar registros' : 'Mostrar registros'}
            </button>

            {mostrarRegistros && (
              <>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {registros.map((registro) => (
                    <li
                      key={registro.id}
                      style={{
                        marginBottom: '10px',
                        borderBottom: '1px solid #ccc',
                        paddingBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '10px',
                      }}
                    >
                      {editId === registro.id ? (
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <select
                            value={editMaterial}
                            onChange={(e) => setEditMaterial(e.target.value)}
                            style={{ padding: '4px', minWidth: '120px' }}
                          >
                            <option value="">Selecciona un material</option>
                            <option value="Plástico">Plástico</option>
                            <option value="Papel">Papel</option>
                            <option value="Vidrio">Vidrio</option>
                            <option value="Metal">Metal</option>
                            <option value="Orgánico">Orgánico</option>
                            <option value="Otro">Otro</option>
                          </select>

                          <input
                            type="number"
                            value={editCantidad}
                            onChange={(e) => setEditCantidad(e.target.value)}
                            min="0"
                            step="0.1"
                            style={{ width: '80px', padding: '4px' }}
                          />

                          <input
                            type="date"
                            value={editFecha}
                            onChange={(e) => setEditFecha(e.target.value)}
                            style={{ padding: '4px' }}
                          />

                          <button
                            onClick={() => guardarEdicion(registro.id)}
                            style={{ padding: '6px 12px', backgroundColor: '#28a745', color: 'white' }}
                          >
                            Guardar
                          </button>
                          <button
                            onClick={cancelarEdicion}
                            style={{ padding: '6px 12px', backgroundColor: '#6c757d', color: 'white' }}
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <>
                          <span>{registro.tipo} — {registro.cantidad} kg — {registro.fecha}</span>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              onClick={() => iniciarEdicion(registro)}
                              style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white' }}
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => eliminarRegistro(registro.id)}
                              style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white' }}
                            >
                              Eliminar
                            </button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={eliminarTodos}
                  style={{
                    marginTop: '12px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                  }}
                >
                  Eliminar Todos
                </button>
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default Registros;
