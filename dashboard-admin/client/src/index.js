import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';

// Configuration mock pour le développement
const setupMockBackend = () => {
  // Intercepter les requêtes axios
  axios.interceptors.request.use(config => {
    console.log('Requête interceptée:', config.url);
    return config;
  });

  // Intercepter les réponses axios et simuler les réponses du backend
  axios.interceptors.response.use(
    response => response,
    error => {
      if (!error.response) {
        // Simuler les réponses pour certaines routes
        const url = error.config.url;
        const method = error.config.method;
        
        console.log(`Simuler la réponse pour ${method.toUpperCase()} ${url}`);
        
        // Mock pour l'authentification
        if (url === '/api/auth/login' && method === 'post') {
          const requestData = JSON.parse(error.config.data);
          
          // Accepter n'importe quel email et mot de passe pour le développement
          if (requestData.email && requestData.password) {
            return Promise.resolve({
              data: {
                token: 'mock-jwt-token',
                user: {
                  id: 1,
                  name: 'Admin Test',
                  email: requestData.email,
                  role: 'admin'
                }
              }
            });
          } else {
            return Promise.reject({
              response: {
                status: 400,
                data: { message: 'Email et mot de passe requis' }
              }
            });
          }
        }
        
        // Mock pour récupérer les infos utilisateur
        if (url === '/api/auth/me' && method === 'get') {
          return Promise.resolve({
            data: {
              id: 1,
              name: 'Admin Test',
              email: 'admin@maxia.fr',
              role: 'admin'
            }
          });
        }
        
        // Par défaut, rejeter avec une erreur network
        return Promise.reject(error);
      }
      
      return Promise.reject(error);
    }
  );
};

// Configurer le mock backend en mode développement
if (process.env.NODE_ENV === 'development') {
  setupMockBackend();
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(','),
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
); 