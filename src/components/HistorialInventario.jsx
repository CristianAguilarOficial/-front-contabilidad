import React, { useState } from 'react';
import '../styles/HistorialInventario.css';
import FormatDay from './FormatDay';
import GroupByDay from './GroupByDay';

function HistorialInventario({ historial }) {
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroRelevancia, setFiltroRelevancia] = useState('');
  const [filtroValor, setFiltroValor] = useState('');
  const [filtroBusqueda, setFiltroBusqueda] = useState('');

  const formatoMoneda = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  // Filtrar datos según los filtros seleccionados
  let historialFiltrado = historial.filter((item) => {
    return (
      (!filtroEstado || item.estado === filtroEstado) &&
      (!filtroRelevancia || item.relevancia === filtroRelevancia) &&
      (!filtroBusqueda ||
        item.producto.toLowerCase().includes(filtroBusqueda.toLowerCase()))
    );
  });

  // Ordenar por fecha (más reciente primero)
  historialFiltrado.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  // Si se ordena por Valor, se ordena dentro de registros con el mismo día
  if (filtroValor) {
    historialFiltrado = historialFiltrado.sort((a, b) => {
      if (FormatDay(a.fecha) === FormatDay(b.fecha)) {
        return filtroValor === 'Alto' ? b.valor - a.valor : a.valor - b.valor;
      }
      return new Date(b.fecha) - new Date(a.fecha);
    });
  }

  // Agrupar por mes y por día
  const historialPorMesYDia = GroupByDay(historialFiltrado);

  return (
    <div className="historial-container">
      <div className="historial-contenido">
        <h2>Historial de Gastos</h2>

        {/* Filtros */}
        <div className="filtros">
          <input
            type="text"
            className="input-busqueda"
            placeholder="Buscar producto..."
            value={filtroBusqueda}
            onChange={(e) => setFiltroBusqueda(e.target.value)}
          />

          <select
            className="select-moderno"
            onChange={(e) => setFiltroEstado(e.target.value)}
            value={filtroEstado}
          >
            <option value="">Estado (Todos)</option>
            <option value="Importante">Importante</option>
            <option value="Poco importante">Poco importante</option>
            <option value="Nada importante">Nada importante</option>
          </select>

          <select
            className="select-moderno"
            onChange={(e) => setFiltroRelevancia(e.target.value)}
            value={filtroRelevancia}
          >
            <option value="">Relevancia (Todos)</option>
            <option value="Hogar">Hogar</option>
            <option value="Empresa">Empresa</option>
            <option value="Salud">Salud</option>
            <option value="Otros">Otros</option>
          </select>

          <select
            className="select-moderno"
            onChange={(e) => setFiltroValor(e.target.value)}
            value={filtroValor}
          >
            <option value="">Valor (Todos)</option>
            <option value="Alto">Mayor a Menor</option>
            <option value="Bajo">Menor a Mayor</option>
          </select>
        </div>

        {/* Renderizado de la tabla agrupada por mes y día */}
        {Object.keys(historialPorMesYDia).length === 0 ? (
          <p>No hay registros.</p>
        ) : (
          Object.entries(historialPorMesYDia).map(([mes, dias]) => (
            <div key={mes}>
              <h3>{mes}</h3>

              <table className="historial-tabla">
                <thead>
                  {Object.entries(dias).map(([dia, { items, total }]) => (
                    <React.Fragment key={dia}>
                      <tr>
                        <th
                          colSpan="5"
                          style={{
                            fontWeight: 'bold',
                            background: '#2ecc71 ',
                            margin: '40px',
                          }}
                        >
                          {dia}
                        </th>
                      </tr>
                      <tr>
                        <th>Producto</th>
                        <th>descripcion</th>
                        <th>Valor</th>
                        <th>Estado</th>
                        <th>Relevancia</th>
                      </tr>
                      {items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.producto}</td>
                          <td>{item.descripcion}</td>
                          <td>{formatoMoneda.format(item.valor)}</td>
                          <td>{item.estado}</td>
                          <td>{item.relevancia}</td>
                        </tr>
                      ))}
                      <tr>
                        <td className="diseño_total" colSpan="4">
                          Total del día:
                        </td>
                        <td className="Total_Historial">
                          {formatoMoneda.format(total)}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </thead>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HistorialInventario;
