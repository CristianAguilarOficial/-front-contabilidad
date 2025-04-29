import { useInventory } from '../context/InventoryContext';
import { useState } from 'react';
import dayjs from 'dayjs';

export default function InventoryHistory() {
  const { inventario, eliminarItem } = useInventory();
  const [search, setSearch] = useState('');
  const [estado, setEstado] = useState('');
  const [relevancia, setRelevancia] = useState('');

  const formatoMoneda = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  });

  // Filtrado de inventario basado en búsqueda, estado y relevancia
  const inventarioFiltrado = inventario
    .filter(
      (item) =>
        item.producto.toLowerCase().includes(search.toLowerCase()) &&
        (estado ? item.estado === estado : true) &&
        (relevancia ? item.relevancia === relevancia : true)
    )
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  const formatFecha = (fecha) => dayjs(fecha).format('DD/MM/YYYY'); // Formatear fecha

  return (
    <div className="p-6 mt-10 bg-gray-50 rounded-xl shadow-md w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Historial de Inventarios
      </h2>

      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-md w-48"
        />
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="border p-2 rounded-md w-48"
        >
          <option value="">Estado (Todos)</option>
          <option>Importante</option>
          <option>Poco importante</option>
          <option>Nada importante</option>
        </select>
        <select
          value={relevancia}
          onChange={(e) => setRelevancia(e.target.value)}
          className="border p-2 rounded-md w-48"
        >
          <option value="">Relevancia (Todos)</option>
          <option>Hogar</option>
          <option>Empresa</option>
          <option>Salud</option>
          <option>Otros</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3">Producto</th>
              <th className="p-3">Descripción</th>
              <th className="p-3">Valor</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Relevancia</th>
              <th className="p-3">Fecha</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inventarioFiltrado.map((item) => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="p-3">{item.producto}</td>
                <td className="p-3">{item.description}</td>
                <td className="p-3">{formatoMoneda.format(item.valor)}</td>
                <td className="p-3">{item.estado}</td>
                <td className="p-3">{item.relevancia}</td>
                <td className="p-3">{formatFecha(item.fecha)}</td>
                <td className="p-3">
                  <button
                    onClick={() => eliminarItem(item._id)} // Eliminar item por ID
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {inventarioFiltrado.length === 0 && (
          <p className="text-center mt-4 text-gray-500">
            No se encontraron resultados.
          </p>
        )}
      </div>
    </div>
  );
}
