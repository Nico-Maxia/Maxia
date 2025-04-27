const winston = require('winston');

// Configuration du logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: process.env.LOG_FILE_PATH || 'logs/error.log',
      level: 'error'
    }),
    new winston.transports.Console()
  ]
});

const errorHandler = (err, req, res, next) => {
  // Log l'erreur
  logger.error('Erreur serveur:', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  // Réponse d'erreur
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Une erreur est survenue' 
      : err.message
  });
};

module.exports = errorHandler; 