import axios from 'axios';

export default axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // <-- apunta al prefijo /api
  withCredentials: true, // si usas cookies para auth
});
