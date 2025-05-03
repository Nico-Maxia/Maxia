import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Layouts
import AdminLayout from './components/layouts/AdminLayout';

// Pages publiques
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Pages sécurisées
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import EmailTemplates from './pages/EmailTemplates';
import CompanyRequests from './pages/CompanyRequests';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Route sécurisée qui vérifie si l'utilisateur est connecté
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Afficher un indicateur de chargement si l'authentification est en cours
  if (loading) {
    return <div className="centered-content">Chargement...</div>;
  }

  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Routes protégées */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="email-templates" element={<EmailTemplates />} />
        <Route path="company-requests" element={<CompanyRequests />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Route 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App; 