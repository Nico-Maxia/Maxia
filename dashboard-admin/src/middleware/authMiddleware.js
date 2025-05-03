const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authService = require('../services/authService');

/**
 * Middleware de vérification de l'authentification
 */
const authenticateToken = async (req, res, next) => {
  try {
    // Récupérer le token d'autorisation du header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"
    
    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé: Token manquant' });
    }
    
    // Vérifier le token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Accès non autorisé: Token invalide' });
      }
      
      // Vérifier si l'utilisateur existe toujours
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: { company: true }
      });
      
      if (!user) {
        return res.status(403).json({ message: 'Accès non autorisé: Utilisateur introuvable' });
      }
      
      // Ajouter les infos de l'utilisateur à la requête
      req.user = {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        companyId: user.company?.id,
      };
      
      // Continuer vers la route protégée
      next();
    });
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return res.status(500).json({ message: 'Erreur serveur lors de l\'authentification' });
  }
};

/**
 * Middleware qui vérifie si l'utilisateur est authentifié via JWT
 * @param {Request} req Requête Express
 * @param {Response} res Réponse Express
 * @param {Function} next Fonction de callback
 */
const authenticate = (req, res, next) => {
  try {
    // Récupérer le token Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'Accès non autorisé' 
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Vérifier et décoder le token
    const decoded = authService.verifyToken(token);
    
    // Stocker les informations de l'utilisateur dans la requête
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ 
      status: 'error', 
      message: 'Accès non autorisé' 
    });
  }
};

/**
 * Middleware qui vérifie si l'utilisateur a le rôle requis
 * @param {Array} roles Tableau des rôles autorisés
 * @returns {Function} Middleware Express
 */
const authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'Accès non autorisé' 
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        status: 'error', 
        message: 'Vous n\'avez pas les droits nécessaires pour effectuer cette action' 
      });
    }
    
    next();
  };
};

// Exporter tous les middleware
module.exports = { authenticate, authorizeRoles, authenticateToken }; 