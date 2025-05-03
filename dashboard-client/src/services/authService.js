import axiosInstance from './axiosConfig';

/**
 * Service d'authentification pour le frontend
 */
class AuthService {
  /**
   * Se connecter au backend
   * @param {string} email Email de l'utilisateur
   * @param {string} password Mot de passe de l'utilisateur
   * @returns {Promise} Réponse de l'API
   */
  async login(email, password) {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      
      if (response.data.status === 'success') {
        this.setToken(response.data.data.token);
        this.setUser(response.data.data.user);
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Déconnexion
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  /**
   * Récupère les informations de l'utilisateur connecté
   * @returns {Promise} Réponse de l'API
   */
  async getCurrentUser() {
    try {
      const response = await axiosInstance.get('/auth/me');
      
      if (response.data.status === 'success') {
        this.setUser(response.data.data.user);
      }
      
      return response.data.data.user;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.logout();
      }
      
      throw this.handleError(error);
    }
  }

  /**
   * Envoie une demande de réinitialisation de mot de passe
   * @param {string} email Email de l'utilisateur
   * @returns {Promise} Réponse de l'API
   */
  async forgotPassword(email) {
    try {
      const response = await axiosInstance.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Change le mot de passe de l'utilisateur
   * @param {string} currentPassword Mot de passe actuel
   * @param {string} newPassword Nouveau mot de passe
   * @returns {Promise} Réponse de l'API
   */
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await axiosInstance.post(
        '/auth/change-password',
        { currentPassword, newPassword }
      );
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Vérifie si le token est valide
   * @returns {Promise<boolean>} Token valide ou non
   */
  async verifyToken() {
    if (!this.getToken()) {
      return false;
    }
    
    try {
      const response = await axiosInstance.get('/auth/verify-token');
      return response.data.status === 'success';
    } catch (error) {
      this.logout();
      return false;
    }
  }

  /**
   * Récupère les headers d'authentification
   * @returns {Object} Headers avec le token Bearer
   */
  getAuthHeader() {
    const token = this.getToken();
    return {
      Authorization: token ? `Bearer ${token}` : ''
    };
  }

  /**
   * Stocke le token dans le localStorage
   * @param {string} token Token JWT
   */
  setToken(token) {
    localStorage.setItem('token', token);
  }

  /**
   * Récupère le token du localStorage
   * @returns {string} Token JWT
   */
  getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Stocke les informations de l'utilisateur dans le localStorage
   * @param {Object} user Informations de l'utilisateur
   */
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Récupère les informations de l'utilisateur du localStorage
   * @returns {Object} Informations de l'utilisateur
   */
  getUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  }

  /**
   * Vérifie si l'utilisateur est connecté
   * @returns {boolean} Utilisateur connecté ou non
   */
  isAuthenticated() {
    return !!this.getToken();
  }

  /**
   * Gère les erreurs des requêtes API
   * @param {Error} error Erreur Axios
   * @returns {Error} Erreur formatée
   */
  handleError(error) {
    if (error.response) {
      // Erreur serveur avec réponse
      const message = error.response.data.message || 'Une erreur est survenue';
      return new Error(message);
    } else if (error.request) {
      // Erreur de connexion
      return new Error('Impossible de se connecter au serveur');
    } else {
      // Autre erreur
      return error;
    }
  }
}

export default new AuthService(); 