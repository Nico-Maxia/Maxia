const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const mailjetController = require('../controllers/mailjet.controller');

// Route pour tester la configuration Mailjet
router.post('/test-config', [
  body('apiKeyPublic').notEmpty().withMessage('Clé API publique requise'),
  body('apiKeyPrivate').notEmpty().withMessage('Clé API privée requise'),
  body('senderEmail').isEmail().withMessage('Email d\'expéditeur invalide'),
  body('senderName').notEmpty().withMessage('Nom d\'expéditeur requis')
], mailjetController.testConfig);

// Route pour sauvegarder la configuration
router.post('/save-config', [
  body('apiKeyPublic').notEmpty().withMessage('Clé API publique requise'),
  body('apiKeyPrivate').notEmpty().withMessage('Clé API privée requise'),
  body('senderEmail').isEmail().withMessage('Email d\'expéditeur invalide'),
  body('senderName').notEmpty().withMessage('Nom d\'expéditeur requis')
], mailjetController.saveConfig);

// Route pour récupérer la configuration actuelle
router.get('/config', mailjetController.getConfig);

// Route de test pour vérifier que le router fonctionne
router.get('/test', (req, res) => {
  res.json({ message: 'Mailjet router fonctionne' });
});

module.exports = router; 