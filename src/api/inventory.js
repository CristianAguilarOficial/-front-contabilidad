// src/api/inventory.js
import axios from './axios'; // usa la instancia que acabas de mostrar

// Obtiene todo el inventario del usuario
export const getInventarioRequest = () => {
  return axios.get('/inventario');
};

// Crea un nuevo ítem en el inventario
export const createInventarioRequest = (item) => {
  return axios.post('/inventario', item);
};

// Elimina un ítem por su ID
export const deleteInventarioRequest = (id) => {
  return axios.delete(`/inventario/${id}`);
};

// Obtiene un ítem específico por ID
export const getInventarioByIdRequest = (id) => {
  return axios.get(`/inventario/${id}`);
};

// Actualiza un ítem por su ID
export const updateInventarioRequest = (id, item) => {
  return axios.put(`/inventario/${id}`, item);
};
