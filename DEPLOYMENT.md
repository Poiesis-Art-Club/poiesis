# Publier Poiesis : GitHub Pages et Netlify

Le dépôt peut être public : les données sensibles restent exclues par `.gitignore`. Les deux valeurs `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY` sont destinées au navigateur et doivent être ajoutées comme variables de déploiement, jamais écrites dans le dépôt. Les visuels utilisent par défaut l’origine publique durable `https://poiesis-assets.netlify.app` ; `VITE_ASSET_ORIGIN` reste une surcharge facultative, sans slash final. Ne jamais ajouter une clé de service Supabase, une clé SMTP, un mot de passe d’application, `DATABASE_URL` ou `JWT_SECRET`.

L’audit de préparation a confirmé que le fichier local `.project-config.json` est ignoré, que les fichiers d’environnement sont exclus, et que le code ne contient que des références à des variables — aucune valeur secrète n’est incluse dans la version publique.

## GitHub Pages

Le dépôt public est [godofcode1/poiesis](https://github.com/godofcode1/poiesis) et GitHub Pages est publié à `https://godofcode1.github.io/poiesis/`. Dans **Settings → Secrets and variables → Actions → Variables**, conservez `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY` ; `VITE_ASSET_ORIGIN` est facultative. GitHub Actions calcule le préfixe à partir du nom courant du dépôt, ce qui produit automatiquement la base `/poiesis/`.

## Netlify

Le site Netlify principal est publié à `https://poiesis-art-club.netlify.app/`. Le nom court exact `poiesis.netlify.app` était déjà attribué ; `poiesis-art-club` est donc le nom de repli validé par le propriétaire. Le fichier `netlify.toml` fixe la commande `pnpm build:static`, le dossier `dist/public` et la réécriture SPA. Dans **Site configuration → Environment variables**, conservez `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY`, puis redéployez le site. `VITE_ASSET_ORIGIN` est facultative, car les visuels restent servis par `https://poiesis-assets.netlify.app`.

## URLs d’authentification de production

Supabase Auth autorise les quatre destinations suivantes : `https://godofcode1.github.io/poiesis/echoes`, `https://godofcode1.github.io/poiesis/email-confirmed`, `https://poiesis-art-club.netlify.app/echoes` et `https://poiesis-art-club.netlify.app/email-confirmed`. L’URL de site par défaut est `https://poiesis-art-club.netlify.app`.

Dans Google Auth Platform, les origines JavaScript `https://godofcode1.github.io` et `https://poiesis-art-club.netlify.app` sont enregistrées, et les liens de branding d’accueil, confidentialité et conditions visent ce dernier hôte. Le callback reste exclusivement `https://qllpnswtlmlftlxieohs.supabase.co/auth/v1/callback`. Les anciennes URL restent temporairement configurées pour éviter d’interrompre les liens ou sessions déjà distribués ; elles pourront être retirées après une période de validation.

## Limite d’identifiants internes

Le répertoire de travail local `/home/ubuntu/poiesis-medieval` et certains identifiants techniques internes conservent l’ancien suffixe. Ils ne sont pas publics, ne déterminent ni le nom du dépôt ni les URL de déploiement, et ne doivent pas être renommés manuellement sans capacité de migration dédiée.
