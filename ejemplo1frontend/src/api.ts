// src/api.ts
import axios from 'axios';

export const BASE_URL = 'http://127.0.0.1:8080/'; // <-- Cambia por la IP/host de tu backend

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
