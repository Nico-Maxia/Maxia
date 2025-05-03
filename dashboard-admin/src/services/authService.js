const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

/**
 * Service d'authentification pour gérer les utilisateurs
 */
class AuthService {
  /**
   * Authentifie un utilisateur et génère un token JWT
   * @param {string} email Email de l'utilisateur
   * @param {string} password Mot de passe de l'utilisateur
   * @returns {Object} Informations utilisateur et token
   */
  async login(email, password) {
    const user = await prisma.user.findUnique({ 
      where: { email },
      include: {
        company: true
      }
    });

    if (!user) {
      throw new Error('Identifiants invalides');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      throw new Error('Identifiants invalides');
    }

    // Générer un token JWT
    const token = this.generateToken(user);

    // Retourner les informations utilisateur (sans le mot de passe) et le token
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token
    };
  }

  /**
   * Génère un token JWT pour l'utilisateur
   * @param {Object} user Utilisateur authentifié
   * @returns {string} Token JWT
   */
  generateToken(user) {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId
    };

    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }

  /**
   * Vérifie si un token est valide
   * @param {string} token Token JWT à vérifier
   * @returns {Object} Payload décodé
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Token invalide ou expiré');
    }
  }

  /**
   * Récupère un utilisateur par son ID
   * @param {number} userId ID de l'utilisateur
   * @returns {Object} Informations utilisateur
   */
  async getUserById(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { company: true }
    });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Génère un mot de passe provisoire aléatoire
   * @param {number} length Longueur du mot de passe
   * @returns {string} Mot de passe provisoire
   */
  generateTemporaryPassword(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
    
    return password;
  }

  /**
   * Réinitialise le mot de passe d'un utilisateur
   * @param {string} email Email de l'utilisateur
   * @returns {string} Nouveau mot de passe temporaire
   */
  async resetPassword(email) {
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    
    const tempPassword = this.generateTemporaryPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    });
    
    return tempPassword;
  }

  /**
   * Change le mot de passe d'un utilisateur
   * @param {number} userId ID de l'utilisateur
   * @param {string} currentPassword Mot de passe actuel
   * @param {string} newPassword Nouveau mot de passe
   * @returns {boolean} Succès de l'opération
   */
  async changePassword(userId, currentPassword, newPassword) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    
    if (!passwordMatch) {
      throw new Error('Mot de passe actuel incorrect');
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });
    
    return true;
  }
}

module.exports = new AuthService(); 