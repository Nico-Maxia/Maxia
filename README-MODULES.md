# Guide de démarrage des modules Maxia

Ce document explique comment démarrer les différents modules du projet Maxia.

## Configuration requise

- Node.js (version 16.x ou supérieure)
- NPM (version 8.x ou supérieure)
- PostgreSQL (pour les bases de données)

## Structure des modules

Le projet Maxia est composé de plusieurs modules qui fonctionnent ensemble :

- **dashboard-client** : Tableau de bord destiné aux clients (dirigeants)
- **dashboard-admin** : Tableau de bord d'administration
- **web-site** : Site vitrine et formulaire d'inscription
- **extension-maxia** : Extension Chrome pour l'optimisation du travail

## Démarrage des modules individuels

### Tableau de bord client

```bash
# Se positionner dans le répertoire
cd dashboard-client

# Démarrer le module complet (frontend + backend)
npm run dev

# Ou démarrer séparément :
# Backend uniquement
npm run dev:server
# Frontend uniquement
npm run dev:client
```

- Interface frontend : http://localhost:3000
- API backend : http://localhost:3002

### Tableau de bord administrateur

```bash
# Se positionner dans le répertoire
cd dashboard-admin

# Démarrer le module
npm run dev
```

- Interface : http://localhost:3001
- API : http://localhost:3003

### Site web

```bash
# Se positionner dans le répertoire
cd web-site

# Démarrer le site
npm run dev
```

- Interface : http://localhost:3004

### Extension Chrome

```bash
# Se positionner dans le répertoire
cd extension-maxia

# Démarrer le mode développement
npm run dev
```

## Démarrage de plusieurs modules simultanément

Nous avons configuré des commandes pour démarrer plusieurs modules en même temps depuis la racine du projet.

```bash
# Se positionner à la racine du projet
cd C:\Maxia  # Ou le chemin de votre projet

# Démarrer tous les modules
npm run start:all

# Démarrer modules spécifiques
npm run start:client  # Tableau de bord client uniquement
npm run start:admin   # Tableau de bord admin uniquement
npm run start:website # Site web uniquement
```

## Points importants

1. **Variables d'environnement** : Chaque module nécessite un fichier `.env` dans son répertoire. Consultez les fichiers `.env.example` pour les variables requises.

2. **Bases de données** : Assurez-vous que PostgreSQL est en cours d'exécution et que les bases de données sont créées avant de démarrer les modules.

3. **Ports utilisés** :
   - dashboard-client (frontend) : 3000
   - dashboard-client (API) : 3002
   - dashboard-admin (frontend) : 3001
   - dashboard-admin (API) : 3003
   - web-site : 3004

4. **Autorisations CORS** : Les modules sont configurés pour communiquer entre eux. Si vous modifiez les ports, mettez à jour les configurations CORS dans les fichiers appropriés.

## Dépannage

### Le serveur démarre puis s'arrête immédiatement
- Vérifiez que le fichier `.env` existe et contient les variables nécessaires
- Assurez-vous que la base de données est accessible

### Problèmes d'authentification
- Vérifiez que les services d'API sont en cours d'exécution
- Confirmez que les variables JWT sont correctement configurées 