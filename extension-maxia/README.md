# Extension Chrome Maxia

Cette extension Chrome est conçue pour optimiser le travail des employés sur le site https://saas.v-mobility.fr/ireception/.

## Structure du Module

```
├── public/              # Ressources statiques
│   ├── manifest.json    # Manifeste de l'extension
│   ├── icons/           # Icônes de l'extension
│   └── popup.html       # HTML du popup
├── src/                 # Code source
│   ├── background/      # Scripts d'arrière-plan
│   ├── content/         # Scripts de contenu
│   ├── popup/           # Interface utilisateur du popup
│   ├── utils/           # Utilitaires
│   └── types/           # Types TypeScript
└── .env                 # Variables d'environnement
```

## Installation et Configuration

1. Copier le fichier de configuration
   ```bash
   cp ../config/env.example .env
   ```

2. Modifier les variables d'environnement selon vos besoins

3. Installer les dépendances
   ```bash
   npm install
   ```

4. Construire l'extension
   ```bash
   npm run build
   ```

5. Charger l'extension dans Chrome
   - Ouvrir Chrome et naviguer vers `chrome://extensions/`
   - Activer le "Mode développeur"
   - Cliquer sur "Charger l'extension non empaquetée"
   - Sélectionner le dossier `dist` créé lors de la construction

## Utilisation

1. L'employé doit se connecter à l'extension avec ses identifiants fournis par son dirigeant
2. L'extension vérifie si la licence est valide auprès de l'API Client
3. Une fois connecté, l'employé peut utiliser les différents flux de travail disponibles

## Communication avec le Backend

L'extension communique avec l'API Client (dashboard-client) sur le port 3002 pour:
- Authentifier les utilisateurs
- Vérifier la validité des licences
- Enregistrer les statistiques d'utilisation des flux

## Flux de Travail

Chaque flux est composé de plusieurs actions qui interagissent avec le site cible. Les flux sont identifiables et leur utilisation est comptabilisée dans le tableau de bord client.

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

## Intégration avec le Dashboard Client

Cette extension est conçue pour fonctionner de manière intégrée avec le Dashboard Client Maxia. Les données d'utilisation sont synchronisées avec le backend pour permettre au dirigeant de visualiser les statistiques de performance.

## Sécurité

L'extension utilise un système d'authentification basé sur des tokens JWT pour garantir que seuls les utilisateurs autorisés peuvent accéder aux fonctionnalités.

## Contribuer

Pour plus d'informations sur la façon de contribuer à ce projet, veuillez consulter notre guide de contribution (à venir).

## Licence

Tous droits réservés © Maxia
