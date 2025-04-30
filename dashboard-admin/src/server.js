require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());

// Routes de base
app.get('/', (req, res) => {
  res.json({ message: 'API Dashboard Admin Maxia' });
});

// Route de test pour vérifier la connexion à la base de données
app.get('/api/test-db', async (req, res) => {
  try {
    await prisma.$connect();
    res.json({ status: 'success', message: 'Connexion à la base de données réussie' });
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Erreur de connexion à la base de données',
      error: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
});

// Démarrage du serveur
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });
}

// Export pour les tests
module.exports = app; 