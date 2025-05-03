import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

// Création du contexte d'authentification
const AuthContext = createContext();

/**
 * Provider du contexte d'authentification
 * @param {Object} props Props du composant
 * @returns {JSX.Element} Provider du contexte
 */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const isTokenValid = await authService.verifyToken();
          
          if (isTokenValid) {
            const user = await authService.getCurrentUser();
            setCurrentUser(user);
          } else {
            authService.logout();
          }
        }
      } catch (err) {
        setError(err.message);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * Connexion de l'utilisateur
   * @param {string} email Email de l'utilisateur
   * @param {string} password Mot de passe de l'utilisateur
   * @returns {Promise} Résultat de la connexion
   */
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(email, password);
      setCurrentUser(response.data.user);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Déconnexion de l'utilisateur
   */
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  /**
   * Réinitialisation du mot de passe
   * @param {string} email Email de l'utilisateur
   * @returns {Promise} Résultat de la réinitialisation
   */
  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.forgotPassword(email);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Modification du mot de passe
   * @param {string} currentPassword Mot de passe actuel
   * @param {string} newPassword Nouveau mot de passe
   * @returns {Promise} Résultat de la modification
   */
  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.changePassword(currentPassword, newPassword);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Valeur du contexte
  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    forgotPassword,
    changePassword,
    isAuthenticated: authService.isAuthenticated()
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook pour utiliser le contexte d'authentification
 * @returns {Object} Contexte d'authentification
 */
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext; 