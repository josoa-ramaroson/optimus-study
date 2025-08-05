// utils/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // <- à définir dans .env
  withCredentials: true // si tu utilises des cookies pour l'auth
});

export default instance;
