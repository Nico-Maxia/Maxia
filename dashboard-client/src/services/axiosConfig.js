import axios from 'axios';
import authService from './authService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';

// Instance Axios avec l'URL de base
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur de requête pour ajouter le token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponse pour gérer les erreurs d'authentification
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si le token est expiré ou invalide, déconnecter l'utilisateur
      authService.logout();
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance; 