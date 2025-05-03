import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

/**
 * Composant de mot de passe oublié
 * @returns {JSX.Element} Formulaire de réinitialisation de mot de passe
 */
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const { forgotPassword } = useAuth();
  
  /**
   * Gère la soumission du formulaire
   * @param {Event} e Événement de soumission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Veuillez saisir votre adresse email');
      return;
    }
    
    try {
      setError('');
      setMessage('');
      setLoading(true);
      
      await forgotPassword(email);
      
      // Afficher un message de succès
      setMessage('Si votre email existe dans notre système, vous recevrez un email de réinitialisation de mot de passe.');
      setEmail('');
    } catch (err) {
      setError(err.message || 'Erreur lors de la demande de réinitialisation');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Mot de passe oublié</h2>
        
        {error && <div className="auth-error">{error}</div>}
        {message && <div className="auth-success">{message}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-button" 
            disabled={loading}
          >
            {loading ? 'Envoi en cours...' : 'Réinitialiser le mot de passe'}
          </button>
        </form>
        
        <div className="auth-links">
          <Link to="/login">Retour à la connexion</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 