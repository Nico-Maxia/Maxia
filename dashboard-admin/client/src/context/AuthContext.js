import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Vérifier l'authentification au chargement de l'application
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }

        // Vérifier si le token est expiré
        try {
          const decodedToken = jwt_decode(token);
          const currentTime = Date.now() / 1000;
          
          if (decodedToken.exp < currentTime) {
            localStorage.removeItem('token');
            setLoading(false);
            return;
          }

          // Configurer le header d'authentification pour Axios
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          try {
            // Récupérer les informations de l'utilisateur
            const response = await axios.get('/api/v1/auth/me');
            setCurrentUser(response.data);
            setIsAuthenticated(true);
          } catch (apiError) {
            console.error('Erreur API:', apiError);
            // Ne pas supprimer le token en cas d'erreur réseau, 
            // c'est peut-être juste le backend qui n'est pas disponible
            if (apiError.response) {
              // Si le backend répond avec une erreur, le token est invalide
              localStorage.removeItem('token');
            }
          }
        } catch (tokenError) {
          console.error('Erreur de décodage du token:', tokenError);
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Erreur d\'authentification:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post('/api/v1/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Erreur de connexion:', error);
      
      // Gestion des erreurs de connexion
      let errorMessage = 'Erreur lors de la connexion';
      
      if (error.response) {
        // Le serveur a répondu avec un code d'erreur
        errorMessage = error.response.data?.message || 'Identifiants incorrects';
      } else if (error.request) {
        // La requête a été envoyée mais sans réponse du serveur
        errorMessage = 'Le serveur est inaccessible, veuillez réessayer plus tard';
      }
      
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Fonction pour demander la réinitialisation du mot de passe
  const forgotPassword = async (email) => {
    try {
      setError(null);
      await axios.post('/api/v1/auth/forgot-password', { email });
      return { success: true };
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de la demande');
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la demande'
      };
    }
  };

  // Fonction pour réinitialiser le mot de passe
  const resetPassword = async (token, password) => {
    try {
      setError(null);
      await axios.post(`/api/v1/auth/reset-password/${token}`, { password });
      return { success: true };
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de la réinitialisation');
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la réinitialisation'
      };
    }
  };

  // Mettre à jour le profil de l'utilisateur
  const updateProfile = async (userData) => {
    try {
      setError(null);
      const response = await axios.put('/api/v1/users/profile', userData);
      setCurrentUser(response.data);
      return { success: true };
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de la mise à jour');
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la mise à jour'
      };
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 