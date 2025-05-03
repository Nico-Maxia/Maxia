import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Pages à créer ultérieurement
const Login = () => <div className="flex min-h-screen items-center justify-center bg-gray-100">
  <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold text-center">Connexion</h1>
    <p className="text-center">Formulaire de connexion à implémenter</p>
  </div>
</div>;

const Dashboard = () => <div className="p-6"><h1 className="text-2xl font-bold">Tableau de Bord</h1></div>;
const Licenses = () => <div className="p-6"><h1 className="text-2xl font-bold">Gestion des Licences</h1></div>;
const Profile = () => <div className="p-6"><h1 className="text-2xl font-bold">Profil Entreprise</h1></div>;

// Composant de protection des routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Chargement...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/licenses" element={
          <ProtectedRoute>
            <Licenses />
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App; 