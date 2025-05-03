const express = require('express');
const router = express.Router();
const licenseController = require('../controllers/licenseController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Toutes les routes nécessitent une authentification
router.use(authenticateToken);

// Routes pour les licences
router.get('/', licenseController.getAllLicenses);
router.get('/:id', licenseController.getLicenseById);
router.post('/', licenseController.createLicense);
router.put('/:id/upgrade', licenseController.upgradeLicense);
router.delete('/:id', licenseController.revokeLicense);
router.get('/:id/usage', licenseController.getLicenseUsage);

module.exports = router; 