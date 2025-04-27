require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mailjetRoutes = require('./routes/mailjet.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

// Configuration de Helmet
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false
}));

// Configuration CORS
app.use((req, res, next) => {
  console.log('CORS Middleware:', req.method, req.url);
  res.header('Access-Control-Allow-Origin', CORS_ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Logger pour le debugging
app.use((req, res, next) => {
  console.log('Request reçue:', {
    method: req.method,
    url: req.url,
    path: req.path,
    baseUrl: req.baseUrl,
    originalUrl: req.originalUrl,
    headers: req.headers
  });
  next();
});

app.use(express.json());

// Routes
console.log('Montage des routes Mailjet sur /api/v1/mailjet');
app.use('/api/v1/mailjet', (req, res, next) => {
  console.log('Route Mailjet accédée:', req.method, req.url);
  next();
}, mailjetRoutes);

// Route de test pour vérifier que le serveur répond
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Catch-all pour les routes non trouvées
app.use((req, res) => {
  console.log('Route non trouvée:', req.method, req.url);
  res.status(404).json({
    success: false,
    message: `Route non trouvée: ${req.method} ${req.url}`
  });
});

// Middleware de gestion d'erreurs
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`CORS autorisé pour: ${CORS_ORIGIN}`);
  console.log('Routes disponibles:');
  console.log('- GET /api/health');
  console.log('- GET /api/v1/mailjet/config');
  console.log('- POST /api/v1/mailjet/test-config');
  console.log('- POST /api/v1/mailjet/save-config');
}); 