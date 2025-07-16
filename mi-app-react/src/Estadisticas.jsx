import React from 'react';

const Estadisticas = ({ estadisticas }) => {
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
        {estadisticas.map((item) => (
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
