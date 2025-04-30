/**
 * Module d'authentification pour l'extension Maxia
 * Gère la connexion, déconnexion et vérification du statut d'authentification
 */
class AuthModule {
  constructor() {
    this.apiBaseUrl = 'https://api.maxia.com/api/v1'; // À remplacer par l'URL réelle de l'API
    this.tokenKey = 'maxia_auth_token';
    this.userKey = 'maxia_user_data';
  }

  /**
   * Connexion de l'utilisateur
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe de l'utilisateur
   * @returns {Promise<Object>} - Données de l'utilisateur
   */
  async login(email, password) {
    try {
      // Dans un environnement de production, cette requête serait envoyée au serveur
      // Pour cette structure de base, nous simulons une réponse
      // À remplacer par une vraie requête API
      
      // Exemple de code pour une vraie API:
      /*
      const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur de connexion');
      }
      
      const data = await response.json();
      */
      
      // Simulation de réponse pour la structure de base
      if (!email || !password) {
        throw new Error('Email et mot de passe requis');
      }
      
      // Simulation d'une réponse réussie
      const mockUser = {
        id: 'user123',
        email: email,
        name: 'Utilisateur Test',
        license: 'LIC-12345-ABCDE',
        token: 'mock-jwt-token-12345'
      };
      
      // Stocker le token et les données utilisateur
      await this._saveAuthData(mockUser);
      
      return mockUser;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  }

  /**
   * Déconnexion de l'utilisateur
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      // Dans un environnement réel, nous enverrions une requête au serveur
      
      // Supprimer les données d'authentification locales
      await this._clearAuthData();
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      throw error;
    }
  }

  /**
   * Récupérer l'utilisateur actuellement connecté
   * @returns {Promise<Object|null>} - Données de l'utilisateur ou null si non connecté
   */
  async getCurrentUser() {
    try {
      const userData = await this._getStoredUserData();
      const token = await this._getStoredToken();
      
      if (!userData || !token) {
        return null;
      }
      
      // Dans un environnement réel, nous vérifierions la validité du token
      // avec une requête au serveur
      
      return userData;
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      return null;
    }
  }

  /**
   * Vérifier si l'utilisateur est connecté
   * @returns {Promise<boolean>}
   */
  async isAuthenticated() {
    const user = await this.getCurrentUser();
    return !!user;
  }

  /**
   * Enregistrer les données d'authentification
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Promise<void>}
   * @private
   */
  async _saveAuthData(userData) {
    const { token, ...userDataWithoutToken } = userData;
    
    // Stocker le token
    await new Promise(resolve => {
      chrome.storage.local.set({ [this.tokenKey]: token }, resolve);
    });
    
    // Stocker les données utilisateur
    await new Promise(resolve => {
      chrome.storage.local.set({ [this.userKey]: userDataWithoutToken }, resolve);
    });
  }

  /**
   * Récupérer le token stocké
   * @returns {Promise<string|null>}
   * @private
   */
  async _getStoredToken() {
    return new Promise(resolve => {
      chrome.storage.local.get([this.tokenKey], result => {
        resolve(result[this.tokenKey] || null);
      });
    });
  }

  /**
   * Récupérer les données utilisateur stockées
   * @returns {Promise<Object|null>}
   * @private
   */
  async _getStoredUserData() {
    return new Promise(resolve => {
      chrome.storage.local.get([this.userKey], result => {
        resolve(result[this.userKey] || null);
      });
    });
  }

  /**
   * Effacer les données d'authentification
   * @returns {Promise<void>}
   * @private
   */
  async _clearAuthData() {
    await new Promise(resolve => {
      chrome.storage.local.remove([this.tokenKey, this.userKey], resolve);
    });
  }
} 