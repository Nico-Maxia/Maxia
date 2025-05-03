const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Configuration de l'administrateur depuis les variables d'environnement ou valeurs par défaut
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@maxia.fr';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
  const adminName = process.env.ADMIN_NAME || 'Administrateur Maxia';
  
  console.log(`Création de l'utilisateur administrateur avec l'email: ${adminEmail}`);

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({
    where: {
      email: adminEmail
    }
  });

  if (existingUser) {
    console.log(`L'utilisateur administrateur avec l'email ${adminEmail} existe déjà.`);
    return;
  }

  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Création de l'utilisateur administrateur
  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: adminName,
      role: 'ADMIN'
    }
  });

  console.log(`Utilisateur administrateur créé avec l'ID: ${admin.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 