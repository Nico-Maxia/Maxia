import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Composant de la page d'accueil
 * @returns {JSX.Element} Page d'accueil
 */
const Home = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="home-container">
      <section className="welcome-section">
        <h2>Bienvenue sur le Dashboard Client Maxia</h2>
        {currentUser && <p>Heureux de vous revoir, {currentUser.name}!</p>}
        <p className="subtitle">
          Ce tableau de bord vous permet de gérer vos licences et de suivre l'activité de l'extension.
        </p>
      </section>
      
      <section className="feature-cards">
        <div className="feature-card">
          <div className="feature-card-icon">🔑</div>
          <h3>Gestion des licences</h3>
          <p>Créez et gérez les licences pour vos employés qui utiliseront l'extension Chrome.</p>
          <Link to="/licenses" className="btn-link">Gérer les licences</Link>
        </div>
        
        <div className="feature-card">
          <div className="feature-card-icon">📊</div>
          <h3>Suivi d'activité</h3>
          <p>Suivez l'utilisation de l'extension par vos employés et consultez les statistiques.</p>
          <button className="btn-link disabled" disabled>Bientôt disponible</button>
        </div>
        
        <div className="feature-card">
          <div className="feature-card-icon">⚙️</div>
          <h3>Paramètres de compte</h3>
          <p>Gérez votre compte, vos informations et vos modes de paiement.</p>
          <button className="btn-link disabled" disabled>Bientôt disponible</button>
        </div>
      </section>
      
      {currentUser && currentUser.company && (
        <section className="company-info">
          <h3>Informations de l'entreprise</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Entreprise :</span>
              <span className="info-value">{currentUser.company.name}</span>
            </div>
            {currentUser.company.address && (
              <div className="info-item">
                <span className="info-label">Adresse :</span>
                <span className="info-value">{currentUser.company.address}</span>
              </div>
            )}
            {currentUser.company.phone && (
              <div className="info-item">
                <span className="info-label">Téléphone :</span>
                <span className="info-value">{currentUser.company.phone}</span>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home; 