# Configuration du Tableau de Bord Admin

Ce document décrit la configuration nécessaire pour le tableau de bord admin de Maxia.

## Variables d'Environnement

Créez un fichier `.env` à la racine du projet dashboard-admin avec les variables suivantes:

```
# Configuration du serveur
PORT=3001
NODE_ENV=development

# Configuration de la base de données
DATABASE_URL="postgresql://postgres:password@localhost:5432/maxia?schema=public"

# Configuration CORS
CORS_ORIGIN=http://localhost:3000

# Configuration JWT
JWT_SECRET=votre_secret_jwt_tres_securise

# Configuration Mailjet
MAILJET_API_KEY=votre_cle_api_mailjet
MAILJET_SECRET_KEY=votre_cle_secrete_mailjet
EMAIL_FROM=noreply@maxia.fr
EMAIL_FROM_NAME=Maxia

# URLs des applications
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
EXTENSION_URL=chrome://extensions
```

## Description des Variables

| Variable | Description |
|----------|-------------|
| PORT | Le port sur lequel le serveur backend sera exécuté |
| NODE_ENV | L'environnement d'exécution (development, production, test) |
| DATABASE_URL | URL de connexion à la base de données PostgreSQL |
| CORS_ORIGIN | L'origine autorisée pour les requêtes CORS |
| JWT_SECRET | Clé secrète pour la génération et la vérification des tokens JWT |
| MAILJET_API_KEY | Clé API Mailjet pour l'envoi d'emails |
| MAILJET_SECRET_KEY | Clé secrète Mailjet pour l'envoi d'emails |
| EMAIL_FROM | Adresse email d'expédition |
| EMAIL_FROM_NAME | Nom d'expédition affiché dans les emails |
| CLIENT_URL | URL du tableau de bord client |
| ADMIN_URL | URL du tableau de bord admin |
| EXTENSION_URL | URL de l'extension Chrome |

## Sécurité

- Assurez-vous que le fichier `.env` est ajouté au `.gitignore` pour éviter de le versionner
- Générez une clé JWT_SECRET forte et unique pour chaque environnement
- Limitez l'accès aux clés API Mailjet 