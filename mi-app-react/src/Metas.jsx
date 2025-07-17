import { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";

// Importa este CSS adicional o ponlo en tu archivo CSS principal
const estilosBarra = {
  height: '30px',          // barra más alta
  minWidth: '50px',        // mínimo ancho visible
  fontWeight: '600',
  fontSize: '1rem',
  color: 'white',
  textShadow: '0 0 4px rgba(0,0,0,0.7)',
};

const estilosTabla = {
  fontSize: '1.1rem',      // texto más grande en tabla
};

const metasPredefinidas = [
  { id: 1, descripcion: "Reciclar 50 kg de Plástico", tipo: "Plástico", objetivo: 50 },
  { id: 2, descripcion: "Reciclar 30 kg de Papel", tipo: "Papel", objetivo: 30 },
  { id: 3, descripcion: "Reciclar 20 kg de Vidrio", tipo: "Vidrio", objetivo: 20 },
  { id: 4, descripcion: "Reciclar 15 kg de Metal", tipo: "Metal", objetivo: 15 },
];

export default function Metas() {
  const [totales, setTotales] = useState({});

  useEffect(() => {
    const registros = JSON.parse(localStorage.getItem("reciclaje")) || [];
    const acumulados = {};

    registros.forEach((item) => {
      acumulados[item.tipo] = (acumulados[item.tipo] || 0) + item.cantidad;
    });

    setTotales(acumulados);
  }, []);

  const calcularProgreso = (tipo, objetivo) => {
    const cantidadActual = totales[tipo] || 0;
    return Math.min((cantidadActual / objetivo) * 100, 100);
  };

  return (
    <Container className="my-4" style={{ maxWidth: '800px' }}>
      <h2 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: '700' }}>
        Metas de Reciclaje
      </h2>

      <Table
        striped
        bordered
        hover
        responsive
        style={estilosTabla}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Meta</th>
            <th>Tipo</th>
            <th>Progreso</th>
            <th>Completado</th>
          </tr>
        </thead>
        <tbody>
          {metasPredefinidas.map((meta) => {
            const progreso = calcularProgreso(meta.tipo, meta.objetivo);
            const progresoVisible = progreso < 5 && progreso > 0 ? 5 : progreso; // mínimo 5% visible
            const completado = progreso >= 100 ? "✅" : "⏳";

            return (
              <tr key={meta.id}>
                <td>{meta.id}</td>
                <td>{meta.descripcion}</td>
                <td>{meta.tipo}</td>
                <td style={{ minWidth: '180px' }}>
                  <div
                    style={{
                      backgroundColor: '#ddd',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      height: estilosBarra.height,
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        width: `${progresoVisible}%`,
                        backgroundColor: progreso >= 100 ? '#4caf50' : '#2196f3',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '8px',
                        color: estilosBarra.color,
                        fontWeight: estilosBarra.fontWeight,
                        fontSize: estilosBarra.fontSize,
                        textShadow: estilosBarra.textShadow,
                        transition: 'width 0.6s ease',
                        minWidth: '30px',
                      }}
                    >
                      {progreso.toFixed(1)}%
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: '1.5rem', textAlign: 'center' }}>{completado}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
