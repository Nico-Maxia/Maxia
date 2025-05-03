# Site Web Maxia

Ce module constitue le site vitrine du projet Maxia et sert de porte d'entrée vers les différents tableaux de bord.

## Structure du Module

```
├── public/              # Ressources statiques
├── src/                 # Code source Next.js
│   ├── components/      # Composants React
│   ├── pages/           # Pages du site
│   ├── styles/          # Styles CSS/SCSS
│   ├── utils/           # Utilitaires
│   └── types/           # Types TypeScript
└── .env.local           # Variables d'environnement
```

## Installation et Configuration

1. Copier le fichier de configuration
   ```bash
   cp ../config/env.example .env.local
   ```

2. Modifier les variables d'environnement selon vos besoins

3. Installer les dépendances
   ```bash
   npm install
   ```

4. Démarrer le serveur de développement
   ```bash
   npm run dev
   ```

## Fonctionnalités

- Présentation du produit
- Formulaire de création de compte dirigeant
- Redirection vers les tableaux de bord
- Téléchargement de l'extension Chrome

## Formulaire de Création de Compte

Le formulaire recueille les informations suivantes:
- Nom du dirigeant
- Prénom
- Nom de l'entreprise
- Numéro de SIREN
- Nombre de licences demandées
- Numéro de téléphone
- Email
- Adresse de l'entreprise

Après l'envoi du formulaire:
1. Un message de validation du compte en attente de modération est affiché
2. Un email est envoyé à l'administrateur
3. L'administrateur peut valider le compte directement depuis l'email
4. Après validation, un email est envoyé au dirigeant avec ses informations de connexion

## Accès

- Site Web: http://localhost:3000 