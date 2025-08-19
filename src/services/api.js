// client/src/services/api.js
import axios from 'axios';

const baseURL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' && window.API_BASE) || // por si quedó algo legacy
  'http://localhost:3001/api'; // fallback en dev local

export const api = axios.create({
  baseURL,
  withCredentials: false,
});
