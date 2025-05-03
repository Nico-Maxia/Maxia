# Projet Maxia

Ce projet se compose de quatre modules principaux qui fonctionnent ensemble pour offrir une solution complète de gestion.

## Architecture du Projet

### Dashboard Admin (Port Backend: 3001, Port Frontend: 3003)

Tableau de bord administrateur destiné à la gestion globale du système.

- Gestion des comptes dirigeants et employés
- Surveillance des données
- Module d'envoi d'emails avec Mailjet

### Dashboard Client (Port Backend: 3002, Port Frontend: 3004)

Tableau de bord destiné aux chefs d'entreprise.

- Gestion du compte entreprise
- Création et gestion des licences employés
- Suivi des flux d'exécution de l'extension
- Module de paiement

### Extension Chrome

Extension pour optimiser le travail sur v-mobility.fr.

- Automatisation des flux de travail
- Connexion avec licence employé
- Communication avec l'API Client (port 3002)

### Site Web (Port: 3000)

Site vitrine pour présenter le produit et servir de porte d'entrée.

- Présentation du produit
- Formulaire de création de compte dirigeant
- Redirection vers les tableaux de bord

## Structure des Répertoires

```
├── dashboard-admin/         # Tableau de bord admin
│   ├── client/              # Frontend React (port 3003)
│   └── src/                 # Backend Node.js (port 3001)
├── dashboard-client/        # Tableau de bord client
│   ├── client/              # Frontend React (port 3004)
│   └── src/                 # Backend Node.js (port 3002)
├── extension-maxia/         # Extension Chrome
├── web-site/                # Site vitrine (port 3000)
└── config/                  # Configurations partagées
```

## Ports Utilisés

| Module | Composant | Port |
|--------|-----------|------|
| Dashboard Admin | Backend API | 3001 |
| Dashboard Admin | Frontend | 3003 |
| Dashboard Client | Backend API | 3002 |
| Dashboard Client | Frontend | 3004 |
| Site Web | Next.js | 3000 |

## Installation et Exécution

Chaque module doit être configuré et exécuté séparément. Voici les étapes pour chacun:

### Dashboard Admin

```bash
# Configuration Backend
cd dashboard-admin
cp ../config/env.example .env
# Ajuster les variables selon besoin
npm install
npm run dev

# Configuration Frontend
cd dashboard-admin/client
cp ../../config/env.example .env.local
# Ajuster les variables selon besoin
npm install
npm start
```

### Dashboard Client

```bash
# Configuration Backend
cd dashboard-client
cp ../config/env.example .env
# Ajuster les variables selon besoin
npm install
npm run dev

# Configuration Frontend
cd dashboard-client/client
cp ../../config/env.example .env.local
# Ajuster les variables selon besoin
npm install
npm start
```

### Site Web

```bash
cd web-site
cp ../config/env.example .env.local
# Ajuster les variables selon besoin
npm install
npm run dev
```

### Extension Chrome

Voir le README dans le dossier extension-maxia pour les instructions spécifiques.

## Variables d'Environnement

Chaque module nécessite ses propres variables d'environnement. Utilisez les fichiers `.env.example` comme modèles et créez vos propres fichiers `.env` ou `.env.local`.

## Workflow Git

- Branches: feature/, fix/, refactor/, docs/, test/
- Format des commits: feat:, fix:, refactor:, docs:, test:

## Base de Données

Le projet utilise PostgreSQL comme base de données avec Prisma comme ORM.
Voir les schémas Prisma dans chaque module pour comprendre la structure des données.
