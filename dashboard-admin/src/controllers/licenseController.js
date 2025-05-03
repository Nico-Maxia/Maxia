const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('crypto');

/**
 * Récupère toutes les licences pour une entreprise
 */
exports.getAllLicenses = async (req, res) => {
  try {
    const { companyId } = req.user;
    
    if (!companyId) {
      return res.status(400).json({ message: 'Utilisateur non associé à une entreprise' });
    }

    const licenses = await prisma.license.findMany({
      where: {
        companyId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.status(200).json(licenses);
  } catch (error) {
    console.error('Erreur lors de la récupération des licences:', error);
    return res.status(500).json({ message: 'Erreur serveur lors de la récupération des licences' });
  }
};

/**
 * Récupère une licence spécifique
 */
exports.getLicenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyId } = req.user;

    const license = await prisma.license.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!license) {
      return res.status(404).json({ message: 'Licence non trouvée' });
    }

    if (license.companyId !== companyId) {
      return res.status(403).json({ message: 'Accès non autorisé à cette licence' });
    }

    return res.status(200).json(license);
  } catch (error) {
    console.error(`Erreur lors de la récupération de la licence ${req.params.id}:`, error);
    return res.status(500).json({ message: 'Erreur serveur lors de la récupération de la licence' });
  }
};

/**
 * Crée une nouvelle licence
 */
exports.createLicense = async (req, res) => {
  try {
    const { employeeName, email } = req.body;
    const { companyId } = req.user;

    if (!companyId) {
      return res.status(400).json({ message: 'Utilisateur non associé à une entreprise' });
    }

    if (!employeeName || !email) {
      return res.status(400).json({ message: 'Nom et email de l\'employé requis' });
    }

    // Générer une clé unique pour la licence
    const licenseKey = crypto.randomBytes(16).toString('hex');
    
    // Calculer la date d'expiration (15 jours pour une licence d'essai)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 15);

    // Créer la licence
    const newLicense = await prisma.license.create({
      data: {
        key: licenseKey,
        employeeName,
        email,
        type: 'TRIAL',
        status: 'ACTIVE',
        expiryDate,
        companyId
      }
    });

    return res.status(201).json(newLicense);
  } catch (error) {
    console.error('Erreur lors de la création de la licence:', error);
    return res.status(500).json({ message: 'Erreur serveur lors de la création de la licence' });
  }
};

/**
 * Met à niveau une licence d'essai vers une licence illimitée
 */
exports.upgradeLicense = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyId } = req.user;

    const license = await prisma.license.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!license) {
      return res.status(404).json({ message: 'Licence non trouvée' });
    }

    if (license.companyId !== companyId) {
      return res.status(403).json({ message: 'Accès non autorisé à cette licence' });
    }

    if (license.type !== 'TRIAL') {
      return res.status(400).json({ message: 'Cette licence est déjà illimitée' });
    }

    // Mise à niveau de la licence
    const updatedLicense = await prisma.license.update({
      where: {
        id: parseInt(id)
      },
      data: {
        type: 'UNLIMITED',
        expiryDate: null
      }
    });

    return res.status(200).json(updatedLicense);
  } catch (error) {
    console.error(`Erreur lors de la mise à niveau de la licence ${req.params.id}:`, error);
    return res.status(500).json({ message: 'Erreur serveur lors de la mise à niveau de la licence' });
  }
};

/**
 * Révoque une licence
 */
exports.revokeLicense = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyId } = req.user;

    const license = await prisma.license.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!license) {
      return res.status(404).json({ message: 'Licence non trouvée' });
    }

    if (license.companyId !== companyId) {
      return res.status(403).json({ message: 'Accès non autorisé à cette licence' });
    }

    // Révocation de la licence
    const updatedLicense = await prisma.license.update({
      where: {
        id: parseInt(id)
      },
      data: {
        status: 'INACTIVE',
        active: false
      }
    });

    return res.status(200).json(updatedLicense);
  } catch (error) {
    console.error(`Erreur lors de la révocation de la licence ${req.params.id}:`, error);
    return res.status(500).json({ message: 'Erreur serveur lors de la révocation de la licence' });
  }
};

/**
 * Récupère les statistiques d'utilisation d'une licence
 */
exports.getLicenseUsage = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyId } = req.user;

    const license = await prisma.license.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!license) {
      return res.status(404).json({ message: 'Licence non trouvée' });
    }

    if (license.companyId !== companyId) {
      return res.status(403).json({ message: 'Accès non autorisé à cette licence' });
    }

    // Pour l'instant, retournons des données simulées
    // À l'avenir, nous pourrions récupérer les statistiques réelles des flux d'exécution
    const usageData = {
      total: 0,
      byFlow: {},
      byPeriod: {
        daily: [],
        monthly: [],
        yearly: []
      }
    };

    return res.status(200).json(usageData);
  } catch (error) {
    console.error(`Erreur lors de la récupération des statistiques d'utilisation de la licence ${req.params.id}:`, error);
    return res.status(500).json({ message: 'Erreur serveur lors de la récupération des statistiques' });
  }
}; 