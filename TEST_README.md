# Guide de test pour le projet Maxia

Ce document explique comment tester les différentes parties du projet Maxia.

## Prérequis

- Node.js (v16+)
- npm ou yarn
- PostgreSQL (pour les tests de dashboard-admin)

## Configuration de l'environnement

1. Créez un fichier `.env` à la racine du projet en vous basant sur le modèle `config/env.example`.
2. Configurez une base de données PostgreSQL locale pour les tests.

## Tests de l'extension Chrome

```bash
cd extension-maxia
npm install
npm test
```

Pour tester l'extension en mode développement:

```bash
npm run build
```

Puis dans Chrome:
1. Allez à `chrome://extensions/`
2. Activez le "Mode développeur"
3. Cliquez sur "Charger l'extension non empaquetée"
4. Sélectionnez le dossier `extension-maxia/dist`

## Tests du dashboard admin

```bash
cd dashboard-admin
npm install
npx prisma generate
npm test
```

Pour tester le serveur en mode développement:

```bash
npm run dev
```

Puis accédez à `http://localhost:3001` pour vérifier que le serveur fonctionne.

Pour tester la connexion à la base de données:
```bash
curl http://localhost:3001/api/test-db
```

## Tests du dashboard client

```bash
cd dashboard-client
npm install
npm test
```

Pour tester l'application React en mode développement:

```bash
npm start
```

Puis accédez à `http://localhost:3000` pour voir l'interface utilisateur.

## Tests d'intégration

Pour un test complet de bout en bout:

1. Démarrez le dashboard admin (backend)
```bash
cd dashboard-admin
npm run dev
```

2. Démarrez le dashboard client (frontend)
```bash
cd dashboard-client
npm start
```

3. Chargez l'extension Chrome en mode développement

4. Testez le flux complet:
   - Créez un compte administrateur
   - Créez une entreprise et des licences
   - Connectez-vous au dashboard client avec les identifiants d'entreprise
   - Utilisez l'extension avec une licence valide

## Résolution des problèmes courants

- **Erreur de connexion à la base de données**: Vérifiez que PostgreSQL est en cours d'exécution et que les identifiants dans le fichier .env sont corrects.
- **Erreur d'installation des dépendances**: Essayez de supprimer le dossier node_modules et le fichier package-lock.json, puis réinstallez avec `npm install`.
- **L'extension ne se charge pas**: Assurez-vous que le build a été correctement généré dans le dossier dist. 