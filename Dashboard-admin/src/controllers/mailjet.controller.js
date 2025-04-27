const { validationResult } = require('express-validator');
const Mailjet = require('node-mailjet');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const mailjetController = {
  // Tester la configuration Mailjet
  testConfig: async (req, res, next) => {
    try {
      console.log('Test de configuration Mailjet');
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { apiKeyPublic, apiKeyPrivate, senderEmail, senderName } = req.body;

      const mailjet = new Mailjet({
        apiKey: apiKeyPublic,
        apiSecret: apiKeyPrivate
      });

      // Tenter d'envoyer un email de test
      const request = await mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: senderEmail,
              Name: senderName
            },
            To: [
              {
                Email: senderEmail,
                Name: senderName
              }
            ],
            Subject: "Test de configuration Mailjet",
            TextPart: "Ceci est un test de configuration Mailjet",
            HTMLPart: "<h3>Test de configuration Mailjet réussi!</h3>"
          }
        ]
      });

      res.json({
        success: true,
        message: 'Configuration Mailjet testée avec succès',
        response: request.body
      });

    } catch (error) {
      console.error('Erreur lors du test de configuration:', error);
      next(error);
    }
  },

  // Sauvegarder la configuration
  saveConfig: async (req, res, next) => {
    try {
      console.log('Sauvegarde de la configuration Mailjet');
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { apiKeyPublic, apiKeyPrivate, senderEmail, senderName } = req.body;

      // Sauvegarder dans la base de données
      const config = await prisma.mailjetConfig.upsert({
        where: { id: 1 }, // On garde une seule configuration
        update: {
          apiKeyPublic,
          apiKeyPrivate,
          senderEmail,
          senderName
        },
        create: {
          apiKeyPublic,
          apiKeyPrivate,
          senderEmail,
          senderName
        }
      });

      res.json({
        success: true,
        message: 'Configuration sauvegardée avec succès',
        config: {
          apiKeyPublic: config.apiKeyPublic,
          apiKeyPrivate: config.apiKeyPrivate,
          senderEmail: config.senderEmail,
          senderName: config.senderName
        }
      });

    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      next(error);
    }
  },

  // Récupérer la configuration
  getConfig: async (req, res, next) => {
    try {
      console.log('Récupération de la configuration Mailjet');
      const config = await prisma.mailjetConfig.findFirst();

      console.log('Configuration trouvée:', config);

      if (!config) {
        console.log('Aucune configuration trouvée');
        return res.status(404).json({
          success: false,
          message: 'Aucune configuration trouvée'
        });
      }

      res.json({
        success: true,
        config: {
          apiKeyPublic: config.apiKeyPublic,
          apiKeyPrivate: config.apiKeyPrivate,
          senderEmail: config.senderEmail,
          senderName: config.senderName
        }
      });

    } catch (error) {
      console.error('Erreur lors de la récupération:', error);
      next(error);
    }
  }
};

// Vérification de l'export du contrôleur
console.log('Contrôleur Mailjet chargé avec les méthodes:', Object.keys(mailjetController));

module.exports = mailjetController; 