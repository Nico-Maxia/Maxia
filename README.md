# Projet Maxia

Ce projet se compose de trois parties principales:

## Dashboard Admin

Tableau de bord administrateur destiné à la gestion globale du système.

- Gestion des comptes dirigeants et employés
- Surveillance des données
- Module d'envoi d'emails avec Mailjet

## Dashboard Client

Tableau de bord destiné aux chefs d'entreprise.

- Gestion du compte entreprise
- Création et gestion des licences employés
- Suivi des flux d'exécution de l'extension
- Module de paiement

## Extension Chrome

Extension pour optimiser le travail sur v-mobility.fr.

- Automatisation des flux de travail
- Connexion avec licence employé

## Site Web

Site vitrine pour présenter le produit.

## Structure du Projet

```├── dashboard-admin/     # Backend et frontend du tableau de bord admin
├── dashboard-client/    # Backend et frontend du tableau de bord client
├── extension-maxia/     # Extension Chrome
├── web-site/            # Site vitrine
└── config/              # Configurations partagées
```

## Règles de Développement

- Architecture modulaire
- Sécurité renforcée
- Tests unitaires
- Documentation claire

## Installation

Instructions détaillées pour l'installation à venir.

## Configuration

Voir `config/env.example` pour la configuration des variables d'environnement.

## Workflow Git

- Branches: feature/, fix/, refactor/, docs/, test/
- Format des commits: feat:, fix:, refactor:, docs:, test:
