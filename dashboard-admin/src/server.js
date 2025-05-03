require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const licenseRoutes = require('./routes/licenseRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.ADMIN_API_PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.ADMIN_CORS_ORIGIN || 'http://localhost:3003',
  credentials: true
}));
app.use(express.json());

// Routes de base
app.get('/', (req, res) => {
  res.json({ message: 'API Dashboard Admin Maxia' });
});

// Routes d'API
app.use('/api/v1/licenses', licenseRoutes);
app.use('/api/v1/auth', authRoutes);

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
if (process.env.ADMIN_NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Serveur Admin démarré sur le port ${PORT}`);
  });
}

// Export pour les tests
module.exports = app; 