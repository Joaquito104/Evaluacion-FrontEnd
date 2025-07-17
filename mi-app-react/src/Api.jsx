//Modulo api local
import { Container, Card, Row, Col } from "react-bootstrap";

export default function Api() {
  const datosAmbientales = [
    {
      id: 1,
      titulo: "¿Qué es el reciclaje?",
      descripcion: "Proceso mediante el cual los materiales desechados son recolectados, procesados y transformados en nuevos productos.",
      imagen: "https://cdn-icons-png.flaticon.com/512/3460/3460334.png",
    },
    {
      id: 2,
      titulo: "Beneficios del reciclaje",
      descripcion: "Reduce el consumo de recursos naturales, disminuye la contaminación y ahorra energía.",
      imagen: "https://cdn-icons-png.flaticon.com/512/3400/3400895.png",
    },
    {
      id: 3,
      titulo: "Materiales reciclables",
      descripcion: "Entre los principales materiales reciclables están: plástico, papel, cartón, vidrio, metales y residuos orgánicos.",
      imagen: "https://cdn-icons-png.flaticon.com/512/3565/3565418.png",
    },
    {
      id: 4,
      titulo: "Impacto de no reciclar",
      descripcion: "Genera acumulación de basura, aumento de gases de efecto invernadero y daño a los ecosistemas.",
      imagen: "https://cdn-icons-png.flaticon.com/512/7374/7374089.png",
    },
    {
      id: 5,
      titulo: "Cómo comenzar a reciclar",
      descripcion: "Separa los residuos en casa, limpia los envases, identifica puntos de reciclaje en tu barrio.",
      imagen: "https://cdn-icons-png.flaticon.com/512/1049/1049707.png",
    },
  ];

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Información Ambiental (Api)</h2>

      <Row>
        {datosAmbientales.map((item) => (
          <Col md={4} key={item.id} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={item.imagen} style={{ height: "200px", objectFit: "contain" }} />
              <Card.Body>
                <Card.Title>{item.titulo}</Card.Title>
                <Card.Text>{item.descripcion}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
