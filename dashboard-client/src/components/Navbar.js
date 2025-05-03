import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Composant de la barre de navigation
 * @returns {JSX.Element} Barre de navigation
 */
const Navbar = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  
  /**
   * Gère la déconnexion
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  /**
   * Bascule l'affichage du menu utilisateur
   */
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };
  
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <h1>Dashboard Client Maxia</h1>
        </Link>
      </div>
      
      <nav className="navbar-nav">
        <ul className="nav-menu">
          {isAuthenticated ? (
            <>
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/licenses">Licences</Link></li>
              
              <li className="user-menu-container">
                <button className="user-menu-button" onClick={toggleUserMenu}>
                  <span className="user-name">{currentUser?.name || 'Utilisateur'}</span>
                  <span className="user-icon">👤</span>
                </button>
                
                {showUserMenu && (
                  <ul className="user-dropdown-menu">
                    <li>
                      <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                        Profil
                      </Link>
                    </li>
                    <li>
                      <Link to="/change-password" onClick={() => setShowUserMenu(false)}>
                        Changer le mot de passe
                      </Link>
                    </li>
                    <li className="dropdown-divider"></li>
                    <li>
                      <button className="logout-button" onClick={handleLogout}>
                        Déconnexion
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </>
          ) : (
            <li><Link to="/login">Connexion</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar; 