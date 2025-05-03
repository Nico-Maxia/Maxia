import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Composant qui protège une route en vérifiant l'authentification
 * Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
 * @returns {JSX.Element} Outlet (contenu de la route) ou redirection
 */
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  
  // Pendant le chargement, afficher un chargement ou rien
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }
  
  // Si non authentifié, rediriger vers la page de connexion
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute; 