import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Récupère la liste de toutes les licences du compte
 * @returns {Promise<Array>} Liste des licences
 */
export const getLicenses = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/v1/licenses`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des licences:', error);
    throw error;
  }
};

/**
 * Récupère les détails d'une licence spécifique
 * @param {string} id - Identifiant de la licence
 * @returns {Promise<Object>} Détails de la licence
 */
export const getLicenseById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/v1/licenses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la licence ${id}:`, error);
    throw error;
  }
};

/**
 * Crée une nouvelle licence
 * @param {Object} licenseData - Données de la licence à créer
 * @returns {Promise<Object>} Licence créée
 */
export const createLicense = async (licenseData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/v1/licenses`, licenseData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la licence:', error);
    throw error;
  }
};

/**
 * Met à niveau une licence d'essai vers une licence illimitée
 * @param {string} id - Identifiant de la licence
 * @returns {Promise<Object>} Licence mise à jour
 */
export const upgradeLicense = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/v1/licenses/${id}/upgrade`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à niveau de la licence ${id}:`, error);
    throw error;
  }
};

/**
 * Révoque une licence
 * @param {string} id - Identifiant de la licence
 * @returns {Promise<Object>} Résultat de l'opération
 */
export const revokeLicense = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/v1/licenses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la révocation de la licence ${id}:`, error);
    throw error;
  }
};

/**
 * Récupère les statistiques d'utilisation d'une licence
 * @param {string} id - Identifiant de la licence
 * @returns {Promise<Object>} Statistiques d'utilisation
 */
export const getLicenseUsage = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/v1/licenses/${id}/usage`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des statistiques d'utilisation de la licence ${id}:`, error);
    throw error;
  }
}; 