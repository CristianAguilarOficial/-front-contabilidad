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

        const res = await getInventarioRequest();

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

  const getInventario = async () => {
    try {
      setLoading(true);
      const res = await getInventarioRequest();
      setInventario(res.data);
    } catch (error) {
      console.error('Error al obtener inventario', error);
    } finally {
      setLoading(false);
    }
  };

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
    const confirmar = window.confirm(
      '¿Estás seguro de que deseas eliminar este ítem?'
    );

    if (!confirmar) return;

    try {
      // Opcional: Podés mostrar un loader específico aquí si usás un estado como `setLoadingId(id)`
      await deleteInventarioRequest(id);

      // Remover del estado local si fue exitoso
      setInventario((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      alert('No se pudo eliminar el ítem. Inténtalo de nuevo.');
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
  const actualizarItem = async (id, item) => {
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
        getInventario,
        createInventario,
        eliminarItem,
        getInventarioById,
        actualizarItem,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}
