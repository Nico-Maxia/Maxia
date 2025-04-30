# Structure du Projet Maxia

## Dashboard Admin

```dashboard-admin/
├── client/                # Frontend React
│   ├── public/
│   ├── src/
│   │   ├── components/    # Composants React
│   │   ├── pages/         # Pages du tableau de bord
│   │   ├── context/       # Contextes React
│   │   ├── hooks/         # Hooks personnalisés
│   │   ├── services/      # Services API
│   │   ├── utils/         # Utilitaires
│   │   └── types/         # Types TypeScript
│   ├── package.json
│   └── tsconfig.json
├── src/                   # Backend Node.js
│   ├── controllers/       # Contrôleurs
│   ├── middleware/        # Middleware
│   ├── routes/            # Routes API
│   ├── services/          # Services métier
│   ├── utils/             # Utilitaires
│   └── server.js          # Point d'entrée
├── prisma/                # ORM Prisma
│   └── schema.prisma      # Schéma de base de données
├── .env                   # Variables d'environnement réelles
├── .env.example           # Exemple de variables d'environnement
└── package.json
```

## Dashboard Client

```dashboard-client/
├── client/                # Frontend React
│   ├── public/
│   ├── src/
│   │   ├── components/    # Composants React
│   │   ├── pages/         # Pages du tableau de bord
│   │   ├── context/       # Contextes React
│   │   ├── hooks/         # Hooks personnalisés
│   │   ├── services/      # Services API
│   │   ├── utils/         # Utilitaires
│   │   └── types/         # Types TypeScript
│   ├── package.json
│   └── tsconfig.json
├── src/                   # Backend Node.js
│   ├── controllers/       # Contrôleurs
│   ├── middleware/        # Middleware
│   ├── routes/            # Routes API
│   ├── services/          # Services métier
│   ├── utils/             # Utilitaires
│   └── server.js          # Point d'entrée
├── prisma/                # ORM Prisma
│   └── schema.prisma      # Schéma de base de données
├── .env                   # Variables d'environnement réelles
├── .env.example           # Exemple de variables d'environnement
└── package.json
```

## Extension Chrome

```extension-maxia/
├── public/                # Ressources statiques
│   ├── manifest.json      # Manifeste de l'extension
│   ├── icons/             # Icônes de l'extension
│   └── popup.html         # HTML du popup
├── src/                   # Code source
│   ├── background/        # Scripts d'arrière-plan
│   ├── content/           # Scripts de contenu
│   ├── popup/             # Interface utilisateur du popup
│   ├── utils/             # Utilitaires
│   └── types/             # Types TypeScript
├── .env                   # Variables d'environnement réelles
├── .env.example           # Exemple de variables d'environnement
└── package.json
```

## Site Web

```web-site/
├── public/                # Ressources statiques
├── src/                   # Code source
│   ├── components/        # Composants React
│   ├── pages/             # Pages du site
│   ├── styles/            # Styles CSS/SCSS
│   ├── utils/             # Utilitaires
│   └── types/             # Types TypeScript
├── .env                   # Variables d'environnement réelles
├── .env.example           # Exemple de variables d'environnement
└── package.json
```

Cette structure est modulaire et suit les meilleures pratiques de développement pour les applications web modernes. Chaque composant peut être développé et déployé indépendamment, mais ils partagent une architecture commune pour faciliter la maintenance.
