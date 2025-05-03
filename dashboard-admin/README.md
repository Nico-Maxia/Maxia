# Dashboard Admin Maxia

Ce module constitue le tableau de bord administrateur du projet Maxia.

## Structure du Module

```
├── client/              # Frontend React (port 3003)
│   └── src/             # Sources React
├── src/                 # Backend Node.js (port 3001)
│   ├── controllers/     # Contrôleurs
│   ├── middleware/      # Middleware
│   ├── routes/          # Routes API
│   ├── services/        # Services métier
│   ├── utils/           # Utilitaires
│   └── server.js        # Point d'entrée
├── prisma/              # ORM Prisma
│   └── schema.prisma    # Schéma de base de données
└── .env                 # Variables d'environnement
```

## Installation et Configuration

### Backend (port 3001)

1. Copier le fichier de configuration
   ```bash
   cp ../config/env.example .env
   ```

2. Modifier les variables d'environnement selon vos besoins

3. Installer les dépendances
   ```bash
   npm install
   ```

4. Générer le client Prisma
   ```bash
   npx prisma generate
   ```

5. Démarrer le serveur
   ```bash
   npm run dev
   ```

### Frontend (port 3003)

1. Aller dans le dossier client
   ```bash
   cd client
   ```

2. Copier le fichier de configuration
   ```bash
   cp ../../config/env.example .env.local
   ```

3. Modifier les variables d'environnement selon vos besoins

4. Installer les dépendances
   ```bash
   npm install
   ```

5. Démarrer l'application
   ```bash
   npm start
   ```

## Fonctionnalités

- Gestion des comptes dirigeants et employés (licences)
- Module d'envoi d'emails avec Mailjet
- Validation des comptes dirigeants

## Accès

- API Backend: http://localhost:3001
- Interface Frontend: http://localhost:3003 