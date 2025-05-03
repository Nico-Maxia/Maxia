const express = require('express');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @route POST /api/v1/auth/login
 * @desc Authentifie un utilisateur et génère un token JWT
 * @access Public
 */
router.post('/login', authController.login);

/**
 * @route POST /api/v1/auth/forgot-password
 * @desc Demande de réinitialisation de mot de passe
 * @access Public
 */
router.post('/forgot-password', authController.forgotPassword);

/**
 * @route GET /api/v1/auth/me
 * @desc Récupère les informations de l'utilisateur connecté
 * @access Private
 */
router.get('/me', authenticate, authController.getCurrentUser);

/**
 * @route POST /api/v1/auth/change-password
 * @desc Modification du mot de passe
 * @access Private
 */
router.post('/change-password', authenticate, authController.changePassword);

/**
 * @route GET /api/v1/auth/verify-token
 * @desc Vérifie si le token est valide
 * @access Private
 */
router.get('/verify-token', authenticate, authController.verifyToken);

module.exports = router; 