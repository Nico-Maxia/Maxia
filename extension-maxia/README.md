# Extension Maxia pour V-Mobility

Cette extension Chrome est conçue pour optimiser le travail des employés sur la plateforme [V-Mobility](https://saas.v-mobility.fr/ireception/).

## Fonctionnalités

- **Authentification utilisateur** : Connexion sécurisée avec les comptes sous licence créés par le dirigeant
- **Flux de travail automatisés** : Automatisation des tâches répétitives sur V-Mobility
- **Suivi des performances** : Enregistrement des statistiques d'utilisation des flux de travail
- **Interface intuitive** : Design moderne et facile à utiliser

## Structure de l'extension

L'extension est conçue de manière modulaire pour faciliter la maintenance et l'ajout de nouvelles fonctionnalités:

```extension-maxia/
├── manifest.json            # Configuration de l'extension
├── src/
│   ├── assets/              # Ressources statiques
│   │   ├── css/             # Feuilles de style
│   │   ├── icons/           # Icônes de l'extension
│   │   └── images/          # Images diverses
│   ├── background/          # Script de fond
│   │   └── background.js    # Service worker de l'extension
│   ├── content/             # Scripts de contenu
│   │   └── content.js       # Script injecté dans les pages V-Mobility
│   ├── popup/               # Interface utilisateur de l'extension
│   │   ├── popup.html       # Structure HTML
│   │   └── popup.js         # Logique du popup
│   └── modules/             # Modules fonctionnels
│       ├── authentication/  # Gestion de l'authentification
│       ├── workflows/       # Gestion des flux de travail
│       ├── utils/           # Utilitaires partagés
│       └── api/             # Communication avec le backend
└── libs/                    # Bibliothèques externes
```

## Installation en mode développement

1. Ouvrir Chrome et naviguer vers `chrome://extensions/`
2. Activer le "Mode développeur" en haut à droite
3. Cliquer sur "Charger l'extension non empaquetée"
4. Sélectionner le dossier `extension-maxia`

## Développement

### Prérequis

- Google Chrome ou un navigateur basé sur Chromium
- Connaissance de JavaScript, HTML et CSS

### Commandes pour le développement

Pour installer les dépendances de développement (si nécessaire à l'avenir):

```npm install
```

Pour construire l'extension (si un système de build est ajouté ultérieurement):

```npm run build
```

## Intégration avec le Dashboard Client

Cette extension est conçue pour fonctionner de manière intégrée avec le Dashboard Client Maxia. Les données d'utilisation sont synchronisées avec le backend pour permettre au dirigeant de visualiser les statistiques de performance.

## Sécurité

L'extension utilise un système d'authentification basé sur des tokens JWT pour garantir que seuls les utilisateurs autorisés peuvent accéder aux fonctionnalités.

## Contribuer

Pour plus d'informations sur la façon de contribuer à ce projet, veuillez consulter notre guide de contribution (à venir).

## Licence

Tous droits réservés © Maxia
