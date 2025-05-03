import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLicenseById, upgradeLicense } from '../services/licenseService';
import './Licenses.css';

const UpgradeLicense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [license, setLicense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchLicense = async () => {
      try {
        setLoading(true);
        const data = await getLicenseById(id);
        
        // Vérifier si la licence est de type essai
        if (data.type !== 'trial') {
          setError('Cette licence n\'est pas une licence d\'essai et ne peut pas être mise à niveau.');
        }
        
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

  const handleUpgrade = async () => {
    try {
      setUpgrading(true);
      setError(null);
      
      await upgradeLicense(id);
      
      setSuccess(true);
      setUpgrading(false);
    } catch (err) {
      setError('Erreur lors de la mise à niveau de la licence. Veuillez réessayer.');
      setUpgrading(false);
      console.error(err);
    }
  };

  if (loading) return <div>Chargement des informations de la licence...</div>;
  if (error && !license) return <div className="error">{error}</div>;
  
  return (
    <div className="upgrade-license">
      <h2>Mise à niveau de la licence</h2>
      
      {success ? (
        <div className="success-message">
          <p>La licence a été mise à niveau avec succès vers une licence illimitée !</p>
          <button onClick={() => navigate('/licenses')} className="primary-btn">
            Retour à la liste des licences
          </button>
        </div>
      ) : (
        <>
          {license && (
            <div className="license-details">
              <h3>Détails de la licence</h3>
              <table>
                <tbody>
                  <tr>
                    <td><strong>Employé :</strong></td>
                    <td>{license.employeeName}</td>
                  </tr>
                  <tr>
                    <td><strong>Email :</strong></td>
                    <td>{license.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Type actuel :</strong></td>
                    <td>Licence d'essai (15 jours)</td>
                  </tr>
                  <tr>
                    <td><strong>Date d'expiration :</strong></td>
                    <td>{new Date(license.expiryDate).toLocaleDateString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          
          <div className="upgrade-info">
            <h3>Informations sur la mise à niveau</h3>
            <p>En mettant à niveau cette licence, vous la transformez en licence illimitée sans date d'expiration.</p>
            <p>Pour que cette licence reste valide, vous devez disposer d'un mode de paiement actif (solde positif ou RIB enregistré).</p>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate('/licenses')} 
              className="secondary-btn"
            >
              Annuler
            </button>
            <button 
              type="button" 
              onClick={handleUpgrade} 
              className="primary-btn" 
              disabled={upgrading || license?.type !== 'trial'}
            >
              {upgrading ? 'Mise à niveau en cours...' : 'Mettre à niveau vers une licence illimitée'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UpgradeLicense; 