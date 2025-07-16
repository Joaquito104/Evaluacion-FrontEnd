import React from 'react';

const indicadores = [
  {
    numero: 1,
    indicador: "Kg de residuos por hogar/mes",
    valorActual: "20 kg",
    valorMeta: "10 kg",
    progreso: 0
  },
  {
    numero: 2,
    indicador: "% de residuos reciclados",
    valorActual: "40%",
    valorMeta: "60%",
    progreso: 0
  },
  {
    numero: 3,
    indicador: "% de hogares compostando",
    valorActual: "30%",
    valorMeta: "60%",
    progreso: 0
  },
  {
    numero: 4,
    indicador: "% de hogares con hábito regular",
    valorActual: "50%",
    valorMeta: "80%",
    progreso: 0
  },
  {
    numero: 5,
    indicador: "Nº de puntos instalados",
    valorActual: "2",
    valorMeta: "10",
    progreso: 0
  },
  {
    numero: 6,
    indicador: "Nº de campañas realizadas",
    valorActual: "2",
    valorMeta: "12 (mensuales)",
    progreso: 0
  },
  {
    numero: 7,
    indicador: "% de hogares con sensores",
    valorActual: "0%",
    valorMeta: "20%",
    progreso: 0
  },
  {
    numero: 8,
    indicador: "Nº de hogares premiados",
    valorActual: "0",
    valorMeta: "100",
    progreso: 0
  },
  {
    numero: 9,
    indicador: "% de nuevos capacitados",
    valorActual: "—",
    valorMeta: "100%",
    progreso: 0
  },
  {
    numero: 10,
    indicador: "% de reducción",
    valorActual: "0%",
    valorMeta: "30% menos",
    progreso: 0
  }
];

const Estadisticas = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nº</th>
          <th>Indicador</th>
          <th>Valor Actual</th>
          <th>Valor Meta</th>
          <th>Progreso</th>
        </tr>
      </thead>
      <tbody>
        {indicadores.map((item) => (
          <tr key={item.numero}>
            <td>{item.numero}</td>
            <td>{item.indicador}</td>
            <td>{item.valorActual}</td>
            <td>{item.valorMeta}</td>
            <td>
              <div>
                <progress value={item.progreso} max="100"></progress>
                <span> {item.progreso}%</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Estadisticas;

