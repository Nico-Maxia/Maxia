import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import du contexte d'authentification
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Import des routes des modules
import AuthRoutes from './modules/auth/routes';
import LicensesRoutes from './modules/licenses/routes';

// Import des composants
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              {/* Routes publiques */}
              {AuthRoutes}
              
              {/* Routes protégées */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                {LicensesRoutes}
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 