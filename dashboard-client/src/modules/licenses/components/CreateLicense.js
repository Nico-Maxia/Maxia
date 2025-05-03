import React, { useState } from 'react';
import { createLicense } from '../services/licenseService';
import './Licenses.css';

const CreateLicense = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    email: '',
    type: 'trial', // Par défaut, on crée une licence d'essai
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      await createLicense(formData);
      
      setSuccess(true);
      setFormData({
        employeeName: '',
        email: '',
        type: 'trial',
      });
      
      setLoading(false);
    } catch (err) {
      setError('Erreur lors de la création de la licence. Veuillez réessayer.');
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="create-license">
      <h2>Créer une nouvelle licence</h2>
      
      {success && (
        <div className="success-message">
          <p>La licence a été créée avec succès !</p>
          <button onClick={() => window.location.href = '/licenses'} className="primary-btn">
            Retour à la liste des licences
          </button>
        </div>
      )}
      
      {!success && (
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="employeeName">Nom de l'employé</label>
            <input
              type="text"
              id="employeeName"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email de l'employé</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="type">Type de licence</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="trial">Licence d'essai (15 jours gratuits)</option>
              <option value="unlimited">Licence illimitée</option>
            </select>
          </div>
          
          <div className="license-info">
            <h3>Informations sur les licences :</h3>
            <ul>
              <li><strong>Licence d'essai :</strong> Validité de 15 jours, gratuite.</li>
              <li><strong>Licence illimitée :</strong> Nécessite un mode de paiement valide.</li>
            </ul>
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={() => window.location.href = '/licenses'} className="secondary-btn">
              Annuler
            </button>
            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? 'Création en cours...' : 'Créer la licence'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateLicense; 