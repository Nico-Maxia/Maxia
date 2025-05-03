# Récapitulatif des Ports Utilisés dans le Projet Maxia

Ce document référence tous les ports utilisés par les différents services du projet Maxia pour faciliter la configuration et éviter les conflits.

## Tableau des Ports

| Service | Description | Port |
|---------|-------------|------|
| Website | Site vitrine Next.js | 3000 |
| Dashboard Admin API | Backend Express.js du tableau de bord admin | 3001 |
| Dashboard Client API | Backend Express.js du tableau de bord client | 3002 |
| Dashboard Admin Frontend | Frontend React.js du tableau de bord admin | 3003 |
| Dashboard Client Frontend | Frontend React.js du tableau de bord client | 3004 |
| Base de données PostgreSQL | Serveur de base de données | 5432 |

## Variables d'Environnement Associées

### Dashboard Admin Backend (.env)
```
ADMIN_API_PORT=3001
ADMIN_CORS_ORIGIN=http://localhost:3003
```

### Dashboard Admin Frontend (.env.local)
```
PORT=3003
REACT_APP_API_URL=http://localhost:3001/api/v1
```

### Dashboard Client Backend (.env)
```
CLIENT_API_PORT=3002
CLIENT_CORS_ORIGIN=http://localhost:3004
```

### Dashboard Client Frontend (.env.local)
```
PORT=3004
REACT_APP_API_URL=http://localhost:3002/api/v1
```

### Website (.env.local)
```
WEBSITE_PORT=3000
NEXT_PUBLIC_ADMIN_URL=http://localhost:3003
NEXT_PUBLIC_CLIENT_URL=http://localhost:3004
NEXT_PUBLIC_CLIENT_API_URL=http://localhost:3002/api/v1
```

### Extension (.env)
```
EXTENSION_API_URL=http://localhost:3002/api/v1
```

## Résolution des Problèmes Courants

- Si un port est déjà utilisé, vous verrez une erreur du type "Port XXXX is already in use"
- Solution : Modifiez le port dans le fichier .env correspondant et assurez-vous de mettre à jour les URLs de communication entre les services
- N'oubliez pas de redémarrer les services après modification des fichiers .env 