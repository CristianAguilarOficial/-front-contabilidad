import axios from './axios';

// Obtener todo el inventario
export const getInventarios = async () => {
  const response = await axios.get('/');
  return response.data;
};

// Obtener estadística del inventario
export const getStats = async () => {
  const response = await axios.get('/stats');
  return response.data;
};

// Obtener un inventario por ID
export const getInventarioById = async (id) => {
  const response = await axios.get(`/${id}`);
  return response.data;
};

// Crear un nuevo inventario
export const createInventario = async (inventario) => {
  const response = await axios.post('/', inventario);
  return response.data;
};

// Actualizar inventario
export const updateInventario = async (id, inventario) => {
  const response = await axios.put(`/${id}`, inventario);
  return response.data;
};

// Eliminar inventario
export const deleteInventario = async (id) => {
  const response = await axios.delete(`/${id}`);
  return response.data;
};
