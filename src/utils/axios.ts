// utils/axios.ts
import axios from 'axios'
import { useAuthStore } from '@/store/authStore';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// Request interceptor pour ajouter le Bearer token
instance.interceptors.request.use(config => {
  // Récupère le token depuis ton store
  const token = useAuthStore.getState().token
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default instance
