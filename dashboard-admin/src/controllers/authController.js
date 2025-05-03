const authService = require('../services/authService');
const mailService = require('../services/mailService');

/**
 * Contrôleur pour gérer les opérations d'authentification
 */
class AuthController {
  /**
   * Authentifie un utilisateur et retourne un token JWT
   * @param {Request} req Requête Express
   * @param {Response} res Réponse Express
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ 
          status: 'error', 
          message: 'Email et mot de passe requis' 
        });
      }
      
      const result = await authService.login(email, password);
      
      res.json({
        status: 'success',
        data: result
      });
    } catch (error) {
      res.status(401).json({ 
        status: 'error', 
        message: error.message 
      });
    }
  }

  /**
   * Récupère les informations de l'utilisateur connecté
   * @param {Request} req Requête Express
   * @param {Response} res Réponse Express
   */
  async getCurrentUser(req, res) {
    try {
      // L'utilisateur est déjà vérifié par le middleware d'authentification
      const userId = req.user.userId;
      const user = await authService.getUserById(userId);
      
      res.json({
        status: 'success',
        data: { user }
      });
    } catch (error) {
      res.status(404).json({ 
        status: 'error', 
        message: error.message 
      });
    }
  }

  /**
   * Demande de réinitialisation de mot de passe
   * @param {Request} req Requête Express
   * @param {Response} res Réponse Express
   */
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ 
          status: 'error', 
          message: 'Email requis' 
        });
      }
      
      const tempPassword = await authService.resetPassword(email);
      
      // Envoi d'email avec le mot de passe temporaire
      await mailService.sendPasswordResetEmail(email, tempPassword);
      
      res.json({
        status: 'success',
        message: 'Un email avec les instructions de réinitialisation a été envoyé'
      });
    } catch (error) {
      res.status(404).json({ 
        status: 'error', 
        message: 'Si votre email existe dans notre système, vous recevrez un email de réinitialisation'
      });
    }
  }

  /**
   * Modification du mot de passe
   * @param {Request} req Requête Express
   * @param {Response} res Réponse Express
   */
  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user.userId;
      
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ 
          status: 'error', 
          message: 'Mot de passe actuel et nouveau mot de passe requis' 
        });
      }
      
      await authService.changePassword(userId, currentPassword, newPassword);
      
      res.json({
        status: 'success',
        message: 'Mot de passe modifié avec succès'
      });
    } catch (error) {
      res.status(400).json({ 
        status: 'error', 
        message: error.message 
      });
    }
  }

  /**
   * Vérifier si le token est valide
   * @param {Request} req Requête Express
   * @param {Response} res Réponse Express
   */
  async verifyToken(req, res) {
    try {
      // Le middleware a déjà vérifié le token
      res.json({
        status: 'success',
        message: 'Token valide',
        data: {
          user: req.user
        }
      });
    } catch (error) {
      res.status(401).json({ 
        status: 'error', 
        message: 'Token invalide'
      });
    }
  }
}

module.exports = new AuthController(); 