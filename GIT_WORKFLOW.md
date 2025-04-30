# Guide de Workflow Git pour le Projet Maxia

## Structure des Branches

Toutes les branches doivent suivre les préfixes obligatoires suivants :

- `feature/` : Pour les nouvelles fonctionnalités
- `fix/` : Pour les corrections de bugs
- `refactor/` : Pour les restructurations de code
- `docs/` : Pour les mises à jour de documentation
- `test/` : Pour l'ajout ou la modification de tests

Exemples :
- `feature/auth-module`
- `fix/email-validation`
- `refactor/database-structure`

## Format des Commits

Tous les messages de commit doivent suivre le format suivant :

```
type(scope): description
```

Où :
- `type` est l'un des suivants :
  - `feat` : nouvelle fonctionnalité
  - `fix` : correction de bug
  - `refactor` : restructuration de code
  - `docs` : documentation
  - `test` : tests
- `scope` indique la partie du projet concernée (ex: auth, admin, client)
- `description` est une brève description des changements

Exemples :
- `feat(auth): ajout du système d'inscription avec email`
- `fix(login): résolution du bug sur le champ mot de passe`

## Règles de Merge

- Les merges doivent uniquement être faits vers `main` ou `dev` après validation
- Les conflits doivent être résolus clairement
- Les tests doivent être passés avec succès avant tout merge

## Workflow de Développement

1. Créer une nouvelle branche à partir de `main` avec le préfixe approprié
2. Développer la fonctionnalité ou correction
3. Commiter régulièrement avec des messages conformes
4. Pousser les changements vers le dépôt distant
5. Créer une Pull Request pour la revue
6. Après validation, merger dans `main`

Ce workflow garantit une collaboration fluide, un versionnage propre et une traçabilité complète du projet. 