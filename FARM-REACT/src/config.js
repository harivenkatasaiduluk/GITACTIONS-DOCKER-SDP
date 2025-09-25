// src/api.js
import axios from "axios";

const config = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // automatically picks from .env
});

export default config;
