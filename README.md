# JK CAPITAL — Prisma Compute

Version préparée pour un **nouveau dépôt GitHub** avec les fichiers du projet à la racine.

## Structure obligatoire

Téléverse le contenu de cette archive directement à la racine du dépôt. Ne téléverse pas le dossier parent comme un sous-dossier.

```text
(repository root)/
├── .github/
│   └── workflows/
│       └── prisma-deploy.yml
├── public/
├── views/
├── .gitignore
├── README.md
├── app.js
├── module.ts
├── package.json
├── package-lock.json
├── prisma.config.ts
└── service.ts
```

## Déploiement GitHub → Prisma

1. Crée un nouveau dépôt GitHub vide, avec `main` comme branche par défaut.
2. Décompresse cette archive sur ton ordinateur.
3. Ouvre le dossier extrait et sélectionne **tout son contenu**, y compris `.github` (pas le dossier parent).
4. Téléverse ces éléments à la racine du nouveau dépôt.
5. Vérifie que `package.json`, `package-lock.json`, `module.ts` et `prisma.config.ts` sont visibles dès l'ouverture du dépôt.
6. Dans Prisma Console, connecte le projet Prisma nommé `prisma` à ce nouveau dépôt GitHub.
7. Dans les paramètres Environment du projet Prisma, définis :
   - `SESSION_SECRET` : secret aléatoire d'au moins 32 caractères.
   - `ADMIN_EMAIL` : adresse de connexion de l'administrateur.
   - `ADMIN_PASSWORD` : mot de passe administrateur fort et unique.
8. Vérifie que GitHub Actions est autorisé à exécuter le workflow, puis pousse un commit sur `main` (ou lance `prisma-deploy` depuis l'onglet Actions).

Le workflow installe les dépendances, lit automatiquement la version exacte de `effect` attendue par la version installée de `@prisma/composer`, l'inscrit dans `overrides` puis réinstalle l'arbre npm. Cela évite le conflit `CLI.CONFIG_UNREADABLE` / `effect/http/FetchHttpClient`. Il construit ensuite `dist/server.mjs` avec Bun avant le déploiement Prisma. Il utilise GitHub OIDC (`id-token: write`) : aucun jeton Prisma permanent ne doit être ajouté au dépôt.

## Paramètres de l'application

- Module Composer : `prisma` (doit correspondre au projet Prisma Console existant).
- Devise : EUR.
- Inscriptions publiques : désactivées.
- Mode démo : désactivé.
- La base PostgreSQL est provisionnée par le module Composer. Le pool PostgreSQL de Compute est limité à une connexion et libère plus rapidement les connexions inactives.

## Important — simulation uniquement

Cette application est une démonstration technique. Les soldes, dépôts, retraits et écritures comptables sont simulés. Elle ne reçoit pas de fonds, n'effectue aucun virement bancaire et ne garantit aucun rendement. N'utilise pas de véritables identifiants bancaires ni de fonds clients.
