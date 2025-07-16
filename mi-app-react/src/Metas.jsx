import { useEffect, useState } from "react";
import { Table, ProgressBar, Container } from "react-bootstrap";

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
    <Container className="my-4">
      <h2 className="text-center mb-4">Metas de Reciclaje</h2>

      <Table striped bordered hover responsive>
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
            const completado = progreso >= 100 ? "✅" : "⏳";

            return (
              <tr key={meta.id}>
                <td>{meta.id}</td>
                <td>{meta.descripcion}</td>
                <td>{meta.tipo}</td>
                <td>
                  <ProgressBar now={progreso} label={`${progreso.toFixed(1)}%`} />
                </td>
                <td>{completado}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
