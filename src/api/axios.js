import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:4000/api', // <-- apunta al prefijo /api
  withCredentials: true, // si usas cookies para auth
});
