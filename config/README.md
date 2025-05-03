# Configuration Partagée - Projet Maxia

Ce dossier contient les configurations partagées entre tous les modules du projet Maxia.

## Contenu

- `env.example` : Modèle de fichiers d'environnement pour tous les modules

## Utilisation

Le fichier `env.example` sert de base pour créer les fichiers d'environnement spécifiques à chaque module. Il contient toutes les variables d'environnement nécessaires, avec des commentaires explicatifs.

### Procédure pour configurer un module

1. Copier le fichier d'exemple vers le module approprié
   ```bash
   # Pour les backends
   cp config/env.example dashboard-admin/.env
   cp config/env.example dashboard-client/.env
   
   # Pour les frontends
   cp config/env.example dashboard-admin/client/.env.local
   cp config/env.example dashboard-client/client/.env.local
   
   # Pour le site web
   cp config/env.example web-site/.env.local
   ```

2. Modifier les variables selon les besoins spécifiques du module

3. Ne jamais commiter les fichiers `.env` ou `.env.local` contenant les valeurs réelles

## Variables d'Environnement Principales

### Base de données
- `DATABASE_URL` : URL de connexion à la base de données PostgreSQL

### Sécurité
- `JWT_SECRET` : Clé secrète pour la génération et validation des jetons JWT
- `ENCRYPTION_KEY` : Clé pour le chiffrement des données sensibles

### Email (Mailjet)
- `MAILJET_API_KEY` : Clé API Mailjet
- `MAILJET_SECRET_KEY` : Clé secrète Mailjet
- `EMAIL_FROM` : Adresse email d'envoi

### Paiement (Stripe)
- `STRIPE_PUBLIC_KEY` : Clé publique Stripe
- `STRIPE_SECRET_KEY` : Clé secrète Stripe

### URLs des services
- `ADMIN_API_URL` : URL de l'API admin
- `CLIENT_API_URL` : URL de l'API client
- `WEBSITE_URL` : URL du site web

## Bonnes Pratiques

- Toujours utiliser des variables d'environnement pour les configurations sensibles
- Définir des valeurs par défaut raisonnables dans le code
- Documenter toute nouvelle variable ajoutée
- S'assurer que les fichiers contenant des informations sensibles sont bien exclus du contrôle de version 