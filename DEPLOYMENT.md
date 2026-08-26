# Publier Poiesis : GitHub Pages et Netlify

Le dépôt peut être public : les données sensibles restent exclues par `.gitignore`. Les deux valeurs `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY` sont destinées au navigateur et doivent être ajoutées comme variables de déploiement, jamais écrites dans le dépôt. Les visuels utilisent par défaut l’origine publique durable `https://poiesis-assets.netlify.app` ; `VITE_ASSET_ORIGIN` reste une surcharge facultative, sans slash final. Ne jamais ajouter une clé de service Supabase, une clé SMTP, un mot de passe d’application, `DATABASE_URL` ou `JWT_SECRET`.

L’audit de préparation a confirmé que le fichier local `.project-config.json` est ignoré, que les fichiers d’environnement sont exclus, et que le code ne contient que des références à des variables — aucune valeur secrète n’est incluse dans la version publique.

## GitHub Pages

Le dépôt public et GitHub Pages sont déjà créés. Dans **Settings → Secrets and variables → Actions → Variables**, ajoutez `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY` ; `VITE_ASSET_ORIGIN` est facultative. GitHub Actions construit le site avec un préfixe adapté au nom du dépôt et le publie à l’adresse `https://godofcode1.github.io/poiesis-medieval/`.

## Netlify

Le site Netlify est publié à `https://poiesis-medieval.netlify.app/`. Le fichier `netlify.toml` fixe la commande `pnpm build:static`, le dossier `dist/public` et la réécriture SPA. Dans **Site configuration → Environment variables**, créez `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY`, puis redéployez le site. `VITE_ASSET_ORIGIN` est facultative, car les assets sont déjà servis par `https://poiesis-assets.netlify.app`.

## Après l’obtention des URLs publiques

Ajoutez dans Supabase Auth → URL Configuration les quatre destinations suivantes : `https://godofcode1.github.io/poiesis-medieval/echoes`, `https://godofcode1.github.io/poiesis-medieval/email-confirmed`, `https://poiesis-medieval.netlify.app/echoes` et `https://poiesis-medieval.netlify.app/email-confirmed`. Dans Google Auth Platform, ajoutez les deux origines sans chemin à **Authorized JavaScript origins**, gardez le callback Supabase inchangé, puis mettez à jour les liens de page d’accueil, confidentialité et conditions du branding avec les URLs de production. Ces étapes sont nécessaires pour que Google OAuth et la confirmation e-mail reviennent vers le bon domaine.
