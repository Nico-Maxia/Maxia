import React, { useState, useEffect } from 'react';
import { getLicenses } from '../services/licenseService';
import './Licenses.css';

const LicensesList = () => {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        setLoading(true);
        const data = await getLicenses();
        setLicenses(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des licences');
        setLoading(false);
        console.error(err);
      }
    };

    fetchLicenses();
  }, []);

  if (loading) return <div>Chargement des licences...</div>;
  if (error) return <div className="error">{error}</div>;
  
  return (
    <div className="licenses-list">
      <h2>Vos licences</h2>
      
      {licenses.length === 0 ? (
        <p>Aucune licence trouvée. Créez votre première licence pour vos employés.</p>
      ) : (
        <table className="licenses-table">
          <thead>
            <tr>
              <th>Nom de l'employé</th>
              <th>Email</th>
              <th>Type de licence</th>
              <th>Date d'expiration</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {licenses.map((license) => (
              <tr key={license.id}>
                <td>{license.employeeName}</td>
                <td>{license.email}</td>
                <td>{license.type === 'trial' ? 'Essai (15 jours)' : 'Illimitée'}</td>
                <td>{license.expiryDate ? new Date(license.expiryDate).toLocaleDateString() : 'Pas d\'expiration'}</td>
                <td>
                  <span className={`status ${license.status}`}>
                    {license.status === 'active' ? 'Active' : 
                     license.status === 'expired' ? 'Expirée' : 
                     license.status === 'suspended' ? 'Suspendue' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <button 
                    className="upgrade-btn"
                    disabled={license.type !== 'trial'}
                    onClick={() => window.location.href = `/licenses/upgrade/${license.id}`}
                  >
                    {license.type === 'trial' ? 'Passer en illimité' : 'Licence illimitée'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <div className="licenses-actions">
        <button className="primary-btn" onClick={() => window.location.href = '/licenses/create'}>
          Créer une nouvelle licence
        </button>
      </div>
    </div>
  );
};

export default LicensesList; 