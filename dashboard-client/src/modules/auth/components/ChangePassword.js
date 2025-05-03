import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

/**
 * Composant de changement de mot de passe
 * @returns {JSX.Element} Formulaire de changement de mot de passe
 */
const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const { changePassword } = useAuth();
  
  /**
   * Gère la soumission du formulaire
   * @param {Event} e Événement de soumission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Les nouveaux mots de passe ne correspondent pas');
      return;
    }
    
    if (newPassword.length < 8) {
      setError('Le nouveau mot de passe doit contenir au moins 8 caractères');
      return;
    }
    
    try {
      setError('');
      setMessage('');
      setLoading(true);
      
      await changePassword(currentPassword, newPassword);
      
      // Afficher un message de succès
      setMessage('Votre mot de passe a été modifié avec succès');
      
      // Réinitialiser les champs
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message || 'Erreur lors du changement de mot de passe');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Changer le mot de passe</h2>
        
        {error && <div className="auth-error">{error}</div>}
        {message && <div className="auth-success">{message}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="currentPassword">Mot de passe actuel</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Votre mot de passe actuel"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="newPassword">Nouveau mot de passe</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Votre nouveau mot de passe"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmez votre nouveau mot de passe"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-button" 
            disabled={loading}
          >
            {loading ? 'Changement en cours...' : 'Changer le mot de passe'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword; 