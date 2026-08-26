# Publier Poiesis : GitHub Pages et Netlify

Le dépôt peut être public : les données sensibles restent exclues par `.gitignore`. Les deux valeurs `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY` sont destinées au navigateur et doivent être ajoutées comme variables de déploiement, jamais écrites dans le dépôt. `VITE_ASSET_ORIGIN` est également requis pour les hôtes externes : utilisez l’origine qui sert les assets Poiesis (sans slash final). Ne jamais ajouter une clé de service Supabase, une clé SMTP, un mot de passe d’application, `DATABASE_URL` ou `JWT_SECRET`.

L’audit de préparation a confirmé que le fichier local `.project-config.json` est ignoré, que les fichiers d’environnement sont exclus, et que le code ne contient que des références à des variables — aucune valeur secrète n’est incluse dans la version publique.

## GitHub Pages

Créez le dépôt public `poiesis-medieval`, puis, dans **Settings → Secrets and variables → Actions → Variables**, ajoutez `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` et `VITE_ASSET_ORIGIN`. Dans **Settings → Pages**, choisissez **GitHub Actions** comme source. Le workflow `.github/workflows/deploy-pages.yml` construit alors le site avec un préfixe adapté au nom du dépôt et publie l’interface à l’adresse `https://godofcode1.github.io/poiesis-medieval/`.

## Netlify

Importez le même dépôt dans Netlify. Le fichier `netlify.toml` fixe automatiquement la commande `pnpm build:static`, le dossier `dist/public` et la réécriture SPA. Dans **Site configuration → Environment variables**, créez `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` et `VITE_ASSET_ORIGIN`, puis lancez le déploiement depuis Netlify.

## Après l’obtention des URLs publiques

Pour chaque URL de production, ajoutez dans Supabase Auth → URL Configuration les deux destinations : `<origine>/echoes` et `<origine>/email-confirmed`. Dans Google Auth Platform, ajoutez l’origine sans chemin à **Authorized JavaScript origins**, gardez le callback Supabase inchangé, puis remplacez les liens de page d’accueil, confidentialité et conditions du branding par les URLs de production. Ces étapes sont nécessaires pour que Google OAuth et la confirmation e-mail reviennent vers le bon domaine.
