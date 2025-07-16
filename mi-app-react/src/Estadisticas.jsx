import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Container, Row, Col, Card, ProgressBar, Alert } from 'react-bootstrap';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Estadisticas() {
  const [datosReciclaje, setDatosReciclaje] = useState([]);

  useEffect(() => {
    const registros = JSON.parse(localStorage.getItem("reciclaje")) || [];
    setDatosReciclaje(registros);
  }, []);

  const calcularTotales = () => {
    const totales = {};
    datosReciclaje.forEach((item) => {
      const tipo = item.tipo;
      totales[tipo] = (totales[tipo] || 0) + Number(item.cantidad);
    });
    return totales;
  };

  const totales = calcularTotales();
  const totalGeneral = Object.values(totales).reduce((acc, val) => acc + val, 0);

  const data = {
    labels: Object.keys(totales),
    datasets: [
      {
        label: "Kg reciclados por material",
        data: Object.values(totales),
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#e91e63", "#9c27b0"],
        borderRadius: 8,
        barPercentage: 0.5
      },
    ],
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Estadísticas de Reciclaje</h2>

      {totalGeneral === 0 ? (
        <Alert variant="warning" className="text-center">
          No hay datos de reciclaje registrados todavía. ¡Agrega tus primeros registros!
        </Alert>
      ) : (
        <>
          <Row className="mb-4">
            <Col md={4}>
              <Card className="shadow-sm border-0 text-center bg-light">
                <Card.Body>
                  <Card.Title>Total Reciclado</Card.Title>
                  <h3 className="fw-bold">{totalGeneral} kg</h3>
                  <ProgressBar
                    now={totalGeneral > 100 ? 100 : totalGeneral}
                    label={`${totalGeneral} kg`}
                    striped
                    variant="success"
                  />
                </Card.Body>
              </Card>
            </Col>

            {Object.entries(totales).map(([tipo, cantidad]) => (
              <Col md={4} key={tipo} className="mt-3 mt-md-0">
                <Card className="shadow-sm border-0 text-center bg-white">
                  <Card.Body>
                    <Card.Title className="text-capitalize">{tipo}</Card.Title>
                    <h4>{cantidad} kg</h4>
                    <ProgressBar
                      now={cantidad > 100 ? 100 : cantidad}
                      label={`${cantidad} kg`}
                      variant="info"
                      striped
                    />
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Card className="p-3 shadow-sm border-0">
            <Bar
              data={data}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Distribución de Reciclaje por Material' },
                },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </Card>

          <div className="my-4">
            <h5 className="text-center mb-2">Progreso General</h5>
            <ProgressBar animated now={totalGeneral > 100 ? 100 : totalGeneral} label={`${totalGeneral} kg`} />
          </div>
        </>
      )}
    </Container>
  );
}
