// src/context/InventoryContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import {
  getInventarioRequest,
  createInventarioRequest,
  deleteInventarioRequest,
  getInventarioByIdRequest,
  updateInventarioRequest,
} from '../api/inventory';

const InventoryContext = createContext();

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within InventoryProvider');
  }
  return context;
};

export function InventoryProvider({ children }) {
  const [inventario, setInventario] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        console.log('🛰️  Iniciando carga del inventario...');
        const res = await getInventarioRequest(); // aquí va el GET
        console.log('✅  Datos desde la BD:', res.data);
        setInventario(res.data);
      } catch (err) {
        console.error(
          '❌ Error cargando inventario:',
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 2️⃣ Crear inventario
  const createInventario = async (item) => {
    try {
      const res = await createInventarioRequest(item); // POST /api/inventario
      setInventario((prev) => [...prev, res.data]); // Añade el nuevo item al estado
      return res.data;
    } catch (err) {
      console.error('Error creando inventario:', err);
    }
  };

  // 3️⃣ Eliminar inventario (coincide con eliminarItem en tus componentes)
  const eliminarItem = async (id) => {
    try {
      await deleteInventarioRequest(id); // DELETE /api/inventario/:id
      setInventario((prev) => prev.filter((i) => i._id !== id)); // Filtra el estado local
    } catch (err) {
      console.error('Error eliminando inventario:', err);
    }
  };

  // 4️⃣ Obtener 1 item (opcional, para edición)
  const getInventarioById = async (id) => {
    try {
      const res = await getInventarioByIdRequest(id); // GET /api/inventario/:id
      return res.data;
    } catch (err) {
      console.error('Error obteniendo inventario por ID:', err);
    }
  };

  // 5️⃣ Actualizar inventario
  const updateInventario = async (id, item) => {
    try {
      const res = await updateInventarioRequest(id, item); // PUT /api/inventario/:id
      setInventario((prev) => prev.map((i) => (i._id === id ? res.data : i)));
      return res.data;
    } catch (err) {
      console.error('Error actualizando inventario:', err);
    }
  };

  return (
    <InventoryContext.Provider
      value={{
        inventario,
        loading,
        createInventario,
        eliminarItem,
        getInventarioById,
        updateInventario,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}
