import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLicenseById, revokeLicense } from '../services/licenseService';
import './Licenses.css';

const LicenseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [license, setLicense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [revoking, setRevoking] = useState(false);
  const [confirmRevoke, setConfirmRevoke] = useState(false);

  useEffect(() => {
    const fetchLicense = async () => {
      try {
        setLoading(true);
        const data = await getLicenseById(id);
        setLicense(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des informations de la licence');
        setLoading(false);
        console.error(err);
      }
    };

    fetchLicense();
  }, [id]);

  const handleRevoke = async () => {
    if (!confirmRevoke) {
      setConfirmRevoke(true);
      return;
    }
    
    try {
      setRevoking(true);
      await revokeLicense(id);
      navigate('/licenses');
    } catch (err) {
      setError('Erreur lors de la révocation de la licence');
      setRevoking(false);
      console.error(err);
    }
  };

  if (loading) return <div>Chargement des informations de la licence...</div>;
  if (error && !license) return <div className="error">{error}</div>;

  return (
    <div className="license-details-container">
      <h2>Détails de la licence</h2>
      
      {license && (
        <div className="license-details-card">
          <div className="license-header">
            <span className={`status-badge ${license.status}`}>
              {license.status === 'active' ? 'Active' : 
               license.status === 'expired' ? 'Expirée' : 
               license.status === 'suspended' ? 'Suspendue' : 'Inactive'}
            </span>
            <h3>{license.employeeName}</h3>
          </div>
          
          <div className="license-info-grid">
            <div className="info-item">
              <span className="label">Email</span>
              <span className="value">{license.email}</span>
            </div>
            
            <div className="info-item">
              <span className="label">Type de licence</span>
              <span className="value">{license.type === 'trial' ? 'Essai (15 jours)' : 'Illimitée'}</span>
            </div>
            
            <div className="info-item">
              <span className="label">Date de création</span>
              <span className="value">{new Date(license.createdAt).toLocaleDateString()}</span>
            </div>
            
            <div className="info-item">
              <span className="label">Date d'expiration</span>
              <span className="value">
                {license.expiryDate 
                  ? new Date(license.expiryDate).toLocaleDateString() 
                  : 'Pas d\'expiration'}
              </span>
            </div>
            
            <div className="info-item">
              <span className="label">Dernière connexion</span>
              <span className="value">
                {license.lastLoginAt 
                  ? new Date(license.lastLoginAt).toLocaleString() 
                  : 'Jamais connecté'}
              </span>
            </div>
            
            <div className="info-item">
              <span className="label">Utilisation</span>
              <span className="value">{license.usageCount || 0} fois</span>
            </div>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="license-actions">
            <button 
              className="secondary-btn" 
              onClick={() => navigate('/licenses')}
            >
              Retour à la liste
            </button>
            
            {license.type === 'trial' && license.status === 'active' && (
              <button 
                className="upgrade-btn" 
                onClick={() => navigate(`/licenses/upgrade/${license.id}`)}
              >
                Passer en illimité
              </button>
            )}
            
            <button 
              className="danger-btn" 
              onClick={handleRevoke}
              disabled={revoking}
            >
              {confirmRevoke 
                ? 'Confirmer la révocation' 
                : revoking 
                  ? 'Révocation en cours...' 
                  : 'Révoquer la licence'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LicenseDetails; 