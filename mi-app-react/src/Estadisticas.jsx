import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Alert,
} from "react-bootstrap";

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
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.6,
      },
    ],
  };

  return (
    <Container className="my-3" style={{ maxWidth: "1000px" }}>
      <h2 className="text-center mb-3 fs-4">Estadísticas de Reciclaje</h2>

      {totalGeneral === 0 ? (
        <Alert variant="warning" className="text-center">
          No hay datos de reciclaje registrados todavía. ¡Agrega tus primeros registros!
        </Alert>
      ) : (
        <>
          <Row className="mb-3 g-2">
            <Col md={4}>
              <Card className="shadow-sm border-0 text-center bg-dark text-white">
                <Card.Body style={{ padding: "1rem" }}>
                  <Card.Title className="fs-6">Total Reciclado</Card.Title>
                  <h5 className="fw-bold">{totalGeneral} kg</h5>
                  <ProgressBar
                    now={totalGeneral > 100 ? 100 : totalGeneral}
                    label={`${totalGeneral} kg`}
                    striped
                    variant="success"
                    style={{ height: "10px", fontSize: "0.7rem" }}
                  />
                </Card.Body>
              </Card>
            </Col>

            {Object.entries(totales).map(([tipo, cantidad]) => {
              const porcentaje =
                totalGeneral > 0 ? ((cantidad / totalGeneral) * 100).toFixed(1) : 0;
              return (
                <Col md={4} key={tipo}>
                  <Card className="shadow-sm border-0 text-center bg-dark text-white">
                    <Card.Body style={{ padding: "1rem" }}>
                      <Card.Title className="fs-6 text-capitalize">{tipo}</Card.Title>
                      <h6>{cantidad} kg ({porcentaje}%)</h6>
                      <ProgressBar
                        now={porcentaje}
                        label={`${porcentaje}%`}
                        variant="info"
                        striped
                        style={{ height: "10px", fontSize: "0.7rem" }}
                      />
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>

          <Card className="p-2 shadow-sm border-0 bg-dark text-white">
            <Bar
              data={data}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: false },
                },
                scales: {
                  y: { beginAtZero: true, ticks: { font: { size: 10 } } },
                  x: { ticks: { font: { size: 10 } } },
                },
              }}
              height={200}
            />
          </Card>
        </>
      )}
    </Container>
  );
}
