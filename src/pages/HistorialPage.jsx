import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import ResumenInventario from '../components/InventoryTotals';
import HistoryTour from '../components/HistoryTour';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

// Formato de fechas
const formatFecha = (fecha) => dayjs.utc(fecha).format('DD/MM/YYYY');
const formatDay = (fecha) => dayjs.utc(fecha).format('D [de] MMMM');

// Agrupación
const groupByDay = (items) => {
  const grouped = {};
  items.forEach((item) => {
    const fecha = dayjs.utc(item.fecha);
    const mes = fecha.format('MMMM [de] YYYY');
    const dia = fecha.format('D [de] MMMM');

    if (!grouped[mes]) grouped[mes] = { dias: {}, totalMes: 0 };
    if (!grouped[mes].dias[dia])
      grouped[mes].dias[dia] = { items: [], total: 0 };

    grouped[mes].dias[dia].items.push(item);
    grouped[mes].dias[dia].total += Number(item.valor);
    grouped[mes].totalMes += Number(item.valor);
  });
  return grouped;
};

export default function MejoradoInventoryHistory() {
  const { inventario, eliminarItem } = useInventory();
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroRelevancia, setFiltroRelevancia] = useState('');
  const [filtroValor, setFiltroValor] = useState('');
  const [actualizacion, setActualizacion] = useState(0);

  const formatoMoneda = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  let inventarioFiltrado = inventario.filter((item) => {
    return (
      (!filtroEstado || item.estado === filtroEstado) &&
      (!filtroRelevancia || item.relevancia === filtroRelevancia) &&
      (!filtroBusqueda ||
        item.producto.toLowerCase().includes(filtroBusqueda.toLowerCase()))
    );
  });

  inventarioFiltrado.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  if (filtroValor) {
    inventarioFiltrado = inventarioFiltrado.sort((a, b) => {
      const diaA = formatDay(a.fecha);
      const diaB = formatDay(b.fecha);
      if (diaA === diaB) {
        return filtroValor === 'Alto' ? b.valor - a.valor : a.valor - b.valor;
      }
      return new Date(b.fecha) - new Date(a.fecha);
    });
  }

  const historialPorMesYDia = groupByDay(inventarioFiltrado);

  return (
    <div className="p-6 mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-md w-full max-w-6xl mx-auto">
      <HistoryTour />
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        <ResumenInventario inventario={inventario} />
        Historial de Inventarios
      </h2>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center  joy-filtros-contable">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={filtroBusqueda}
          onChange={(e) => setFiltroBusqueda(e.target.value)}
          className="border p-2 rounded-md w-full sm:w-48 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 joy-filtro-busqueda "
        />
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="border p-2 rounded-md w-full sm:w-48 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600  joy-filtro-estado"
        >
          <option value="">Estado (Todos)</option>
          <option value="Importante">Importante</option>
          <option value="Poco importante">Poco importante</option>
          <option value="Nada importante">Nada importante</option>
        </select>
        <select
          value={filtroRelevancia}
          onChange={(e) => setFiltroRelevancia(e.target.value)}
          className="border p-2 rounded-md w-full sm:w-48 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 joy-filtro-relevancia"
        >
          <option value="">Relevancia (Todos)</option>
          <option value="Hogar">Hogar</option>
          <option value="Empresa">Empresa</option>
          <option value="Salud">Salud</option>
          <option value="Otros">Otros</option>
        </select>
        <select
          value={filtroValor}
          onChange={(e) => setFiltroValor(e.target.value)}
          className="border p-2 rounded-md w-full sm:w-48 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600  joy-filtro-valor"
        >
          <option value="">Valor (Todos)</option>
          <option value="Alto">Mayor a Menor</option>
          <option value="Bajo">Menor a Mayor</option>
        </select>
      </div>

      {Object.keys(historialPorMesYDia).length === 0 ? (
        <p className="text-center mt-4 text-gray-500 dark:text-gray-400">
          No hay registros.
        </p>
      ) : (
        Object.entries(historialPorMesYDia).map(([mes, { dias, totalMes }]) => (
          <div key={mes} className="mb-8 joy-mes-header">
            <h3 className="text-xl font-semibold mb-1 text-gray-700 dark:text-gray-200 ">
              {mes}
            </h3>
            <p className="text-green-700 dark:text-green-400 font-bold mb-4  ">
              Total del mes: {formatoMoneda.format(totalMes)}
            </p>

            <div className="overflow-x-auto joy-dia-header">
              <AnimatePresence>
                {Object.entries(dias).map(([dia, { items, total }]) => (
                  <motion.div
                    key={dia}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6"
                  >
                    <div className="bg-blue-500 text-white p-3 rounded-t-md font-bold">
                      {dia}
                    </div>

                    <table className="min-w-full border-collapse bg-white dark:bg-gray-700 rounded-b-md shadow-sm">
                      <thead className="bg-gray-100 dark:bg-gray-600">
                        <tr>
                          <th className="p-3 text-left">Producto</th>
                          <th className="p-3 text-left">Descripción</th>
                          <th className="p-3 text-left">Valor</th>
                          <th className="p-3 text-left">Estado</th>
                          <th className="p-3 text-left">Relevancia</th>
                          <th className="p-3 text-left">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr
                            key={item._id}
                            className=" text-zinc-950 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                          >
                            <td className="p-3">{item.producto}</td>
                            <td className="p-3">{item.description}</td>
                            <td className="p-3">
                              {formatoMoneda.format(item.valor)}
                            </td>
                            <td className="p-3">{item.estado}</td>
                            <td className="p-3">{item.relevancia}</td>
                            <td className="p-3">
                              <button
                                onClick={() => {
                                  eliminarItem(item._id);
                                  setActualizacion((prev) => prev + 1);
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white  px-3 py-1 rounded-md text-sm  joy-eliminar"
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-gray-50 dark:text-white dark:bg-gray-900 ">
                          <td colSpan="2" className="p-3 font-bold text-right">
                            Total del día:
                          </td>
                          <td
                            colSpan="4"
                            className="p-3 font-bold text-green-700 dark:text-green-400"
                          >
                            {formatoMoneda.format(total)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
