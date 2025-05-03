require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.CLIENT_API_PORT || 3002;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_CORS_ORIGIN || 'http://localhost:3004',
  credentials: true
}));
app.use(express.json());

// Routes de base
app.get('/', (req, res) => {
  res.json({ message: 'API Dashboard Client Maxia' });
});

// Routes d'API
// À compléter avec les routes spécifiques au dashboard client

// Route de test pour vérifier le fonctionnement du serveur
app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'success', 
    message: 'Serveur client fonctionnel',
    env: {
      port: PORT,
      nodeEnv: process.env.CLIENT_NODE_ENV || 'development'
    }
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur Client démarré sur le port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Export pour les tests
module.exports = app; 