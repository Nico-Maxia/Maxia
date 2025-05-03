# Configuration du Tableau de Bord Client

Ce document décrit la configuration nécessaire pour le tableau de bord client de Maxia.

## Variables d'Environnement

Créez un fichier `.env` à la racine du projet dashboard-client avec les variables suivantes:

```
# URL de l'API
REACT_APP_API_URL=http://localhost:3001/api/v1

# Mode d'environnement
NODE_ENV=development

# Configuration du développement
PORT=3000
```

## Description des Variables

| Variable | Description |
|----------|-------------|
| REACT_APP_API_URL | URL de l'API backend à laquelle le frontend se connectera |
| NODE_ENV | L'environnement d'exécution (development, production, test) |
| PORT | Le port sur lequel le serveur de développement React sera exécuté |

## Sécurité

- Assurez-vous que le fichier `.env` est ajouté au `.gitignore` pour éviter de le versionner
- Les variables d'environnement React doivent toujours commencer par `REACT_APP_` pour être accessibles dans l'application
- Le contenu du fichier `.env` sera intégré lors de la compilation (build), assurez-vous de ne pas inclure de secrets sensibles

## Développement

Pour le développement, vous pouvez créer un fichier `.env.development.local` qui sera prioritaire sur `.env` en mode développement.

## Production

Pour la production, vous pouvez créer un fichier `.env.production` avec les variables d'environnement spécifiques à la production.

```
REACT_APP_API_URL=https://api.maxia.fr/api/v1
NODE_ENV=production
``` 