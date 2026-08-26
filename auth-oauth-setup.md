# Poiesis — configuration Google OAuth

## État au 26 août 2026

Google OAuth est configuré pour le projet Cloud existant `notre-fil-rouge-9d6fa`. Le client Web autorise l’origine de prévisualisation Poiesis et redirige vers le callback Supabase. Les identifiants du client sont enregistrés uniquement dans Google Cloud et dans les réglages du fournisseur Google de Supabase ; aucun secret OAuth ne doit être stocké dans ce dépôt.

Dans Supabase, le fournisseur Google est activé. La confirmation e-mail des comptes e-mail + mot de passe reste activée. La liste de redirections autorisées comprend `/email-confirmed` et `/echoes` sur l’URL de prévisualisation actuelle.

Les pages publiques suivantes ont été ajoutées au branding Google OAuth et vérifiées en bureau et mobile : `/home`, `/privacy` et `/terms`. Leur adresse de prévisualisation devra être remplacée par le domaine public définitif de Poiesis dès qu’il sera attribué.

## Limite restante avant ouverture générale

L’application Google Auth est publiée en **production** depuis Google Auth Platform > Audience : les membres disposant d’un compte Google peuvent donc employer le bouton de connexion. Google indique que l’application reste « non validée » tant qu’aucune validation externe n’est demandée ; aucun niveau d’accès sensible ou restreint n’est utilisé. Il reste à tester une authentification réelle de bout en bout, puis à remplacer les URLs de prévisualisation par le domaine public Poiesis dès qu’il existe.

## Validation réelle

Le 26 août 2026, la connexion Google a été effectuée avec le compte de gestion réellement connecté au navigateur. Google a renvoyé la session vers `/echoes`, Supabase a ouvert la session membre et l’archive a affiché l’adresse authentifiée. Aucune publication ni commentaire de démonstration n’a été créé pendant ce test.

## Sources officielles

- Supabase, [Login with Google](https://supabase.com/docs/guides/auth/social-login/auth-google)
- Google, [Configure the OAuth consent screen and choose scopes](https://developers.google.com/workspace/guides/configure-oauth-consent)
- Supabase, [Redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls)
