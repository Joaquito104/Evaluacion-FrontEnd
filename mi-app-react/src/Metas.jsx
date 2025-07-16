import React from 'react';
import Registros from './Registros';

const metas = [
  {
    numero: 1,
    meta: "Disminuir generación total de residuos",
    responsable: "Coordinador ambiental",
    plazo: "Dic 2025"
  },
  {
    numero: 2,
    meta: "Aumentar tasa de reciclaje",
    responsable: "Equipo técnico",
    plazo: "Dic 2025"
  },
  {
    numero: 3,
    meta: "Ampliar compostaje domiciliario",
    responsable: "Promotores ambientales",
    plazo: "Mar 2026"
  },
  {
    numero: 4,
    meta: "Incrementar uso de productos reutilizables",
    responsable: "Educadores",
    plazo: "Nov 2025"
  },
  {
    numero: 5,
    meta: "Crear puntos de acopio por barrio",
    responsable: "Logística y barrios",
    plazo: "Dic 2025"
  },
  {
    numero: 6,
    meta: "Realizar campañas educativas",
    responsable: "Comunicaciones",
    plazo: "Dic 2025"
  },
  {
    numero: 7,
    meta: "Monitoreo digital de reciclaje",
    responsable: "Innovación",
    plazo: "Jun 2026"
  },
  {
    numero: 8,
    meta: "Incentivar hogares recicladores",
    responsable: "Coordinador del plan",
    plazo: "Ene 2026"
  },
  {
    numero: 9,
    meta: "Capacitar nuevos integrantes",
    responsable: "Facilitadores",
    plazo: "Permanente"
  },
  {
    numero: 10,
    meta: "Reducir residuos no reciclables",
    responsable: "Coordinador ambiental",
    plazo: "—"
  }
];

const Metas = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nº</th>
          <th>Meta</th>
          <th>Responsable</th>
          <th>Plazo</th>
        </tr>
      </thead>
      <tbody>
        {metas.map((meta) => (
          <tr key={meta.numero}>
            <td>{meta.numero}</td>
            <td>{meta.meta}</td>
            <td>{meta.responsable}</td>
            <td>{meta.plazo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Metas;
;

