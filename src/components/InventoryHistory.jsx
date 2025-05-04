import { useInventory } from '../context/InventoryContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default function InventoryHistory({ onEditItem }) {
  const { inventario, eliminarItem } = useInventory();

  const formatoMoneda = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  });

  // Ordenar por fecha de creación DESCENDENTE
  const inventarioOrdenado = [...inventario].sort(
    (a, b) => new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id)
  );
  const formatFecha = (fecha) => {
    return dayjs.utc(fecha).format('DD/MM/YYYY');
  };

  const handleEditar = (item) => {
    if (onEditItem) {
      onEditItem(item);
    } else {
      console.log('Editar item:', item);
      alert(`Editando item: ${item.producto}`);
    }
  };

  return (
    <div className="p-6 mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-md w-full max-w-6xl mx-auto joy-historial-titulo">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white ">
        Historial de Inventarios
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left text-gray-900 dark:text-white">
          <thead className="bg-blue-500 text-white dark:bg-blue-700">
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
            {inventarioOrdenado.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="p-3">{item.producto}</td>
                <td className="p-3">{item.description}</td>
                <td className="p-3">{formatoMoneda.format(item.valor)}</td>
                <td className="p-3">{item.estado}</td>
                <td className="p-3">{item.relevancia}</td>
                <td className="p-3">{formatFecha(item.fecha)}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEditar(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm "
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarItem(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm "
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {inventarioOrdenado.length === 0 && (
          <p className="text-center mt-4 text-gray-500 dark:text-gray-400">
            No hay inventarios aún. ¡Hora de llenar esas estanterías! 🧾
          </p>
        )}
      </div>
    </div>
  );
}
