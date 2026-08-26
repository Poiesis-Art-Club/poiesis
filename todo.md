# Mise à jour du portail Poiesis

## Limite e-mail et connecteur 21st

- [ ] Confirmer que la connexion e-mail et mot de passe remplace le lien magique dans le parcours principal.
- [x] Préparer le connecteur MCP 21st à l’URL officielle avec une clé API utilisateur.
- [ ] Vérifier la liste des outils 21st après la connexion du connecteur.

## Connexion durable, thème sombre et Studios

- [ ] Remplacer le lien magique limité par une inscription et connexion e-mail + mot de passe Supabase.
- [ ] Conserver les sessions membres de façon sécurisée sans stocker de mot de passe dans l’application.
- [ ] Corriger le basculement et les contrastes du thème sombre.
- [ ] Ajouter aux Studios davantage de pistes pratiques : matière, image, son, scène, artisanat, édition, numérique, cuisine culturelle et collaborations.
- [ ] Tester les parcours inscription, connexion persistante et les thèmes clair/sombre.

### Vérification visuelle en cours

Les Studios enrichis s’affichent avec les huit pistes de pratiques concrètes. Le bouton de thème modifie désormais visiblement les surfaces : violet profond et ivoire en mode sombre, puis feuillet clair lisible après basculement.

Le portail membre affiche bien un choix « Sign in / Create account » et l’inscription ajoute un second champ de confirmation de mot de passe, sans proposer de lien magique comme parcours principal.

Le formulaire bloque localement deux mots de passe différents avant tout appel Supabase et affiche un retour clair. La création réelle d’un compte n’a pas été simulée afin de ne pas créer de membre fictif ni consommer la limite e-mail ; un membre réel peut finaliser son mot de passe depuis sa session confirmée.

Le connecteur MCP 21st a été créé et activé avec l’endpoint officiel. Sa configuration expose bien les outils attendus dans son inspection, mais l’outil de ligne de commande de la session en cours ne le découvre pas encore ; la vérification d’appel réel reste donc en attente d’un rafraîchissement de session.

## Lien magique et e-mail membre

- [x] Ajouter une page Poiesis de confirmation d’e-mail et de retour d’authentification.
- [x] Configurer l’URL de redirection autorisée vers cette page dans Supabase.
- [x] Conserver provisoirement le message Supabase par défaut, faute de SMTP personnalisé, tout en préparant la personnalisation ultérieure.
- [ ] Vérifier le retour de connexion et l’accès aux Échos après confirmation.

## Correction visuelle du portail

- [x] Décaler l’ornement latéral du portail vers la gauche afin de préserver la lisibilité du texte central.
- [x] Vérifier le portail corrigé sur desktop et mobile.

## Identité officielle Poiesis

- [x] Publier et intégrer le logo officiel fourni dans le site.
- [x] Remplacer tous les liens Instagram génériques par @poiesis_art_club.
- [x] Appliquer la palette corail, violet, ivoire et or inspirée du logo aux écrans emblématiques.

## Comptes membres et Échos connectés

- [x] Définir les données nécessaires aux profils, publications Échos et réponses.
- [x] Activer le projet full-stack avec comptes membres et base de données.
- [x] Connecter l’inscription et la connexion aux comptes réels.
- [x] Permettre aux membres connectés de publier et commenter des Échos.
- [x] Recentrer l’accueil sur la présentation du club et l’accès aux Échos.
- [ ] Tester les flux d’authentification et de publication sans créer de contenu fictif.

### État de validation réel

Un lien magique Supabase a été envoyé à l’adresse de test explicitement fournie par le propriétaire. Supabase a créé la demande d’authentification, tandis que la session reste à confirmer après ouverture de l’e-mail. Le test de santé du projet Supabase réussit, l’accès invité à Échos est bien bloqué par une page de connexion, et les politiques RLS de lecture, création, modification et suppression sont présentes sur les profils, Échos et réponses. Aucune publication de démonstration n’a été créée.

Une seconde demande de lien magique a été envoyée après l’enregistrement de la nouvelle URL de retour `/email-confirmed` dans la configuration Supabase.

Le propriétaire a confirmé que le second lien magique fonctionne correctement avec le nouveau retour Poiesis.

Le navigateur de test séparé ne partage pas automatiquement la session créée dans la boîte du propriétaire ; la confirmation sera donc vérifiée côté Supabase avant de marquer l’accès membre comme validé.

Supabase confirme que l’adresse de test est validée et qu’une session membre a été établie. Il reste à confirmer visuellement, dans la session du propriétaire, que le bouton « Enter Echoes » ouvre bien l’archive sans écran invité.

### Validation finale à effectuer

- [ ] Vérifier en navigateur la session authentifiée après confirmation, puis l’accès à `/echoes` sans écran invité.

## Annonces et inscriptions via Instagram

- [x] Retirer la page Programme et les liens de navigation associés.
- [x] Relier les appels à l’action pour événements, inscriptions et propositions vers Instagram.
- [x] Vérifier que la navigation ne mène plus à une page d’annonces interne.

## Typographie et Renaissance

- [x] Auditer les titres, textes, formulaires et repères du site par rapport à une esthétique médiévale et Renaissance lisible.
- [x] Ajouter une hiérarchie typographique inspirée des manuscrits, des humanistes et des lettrines.
- [x] Introduire des cadres gravés, filigranes et repères de page sur les écrans principaux.
- [x] Contrôler la lisibilité des nouvelles typographies sur desktop et mobile.

## Refonte de l’espace membre

- [x] Auditer la composition actuelle de la connexion par rapport au portail de référence.
- [x] Recomposer l’écran membre avec les arcades, l’emblème, les sceaux, la chouette et le parchemin fournis.
- [x] Renforcer les retours de saisie, les états locaux et la lisibilité responsive du formulaire.
- [x] Vérifier visuellement la connexion sur desktop et mobile.

### Constats de composition

La connexion actuelle utilise les bons matériaux mais les réduit à un seul feuillet central, trop étroit et statique. La recomposition doit donner un rôle structurel aux arcades, créer une double-page de membre avec hiérarchie nette, mettre l’emblème et la chouette en scène, puis distinguer clairement l’accès membre du lien vers l’adhésion.

## Reprise de direction demandée

- [x] Comparer le portail, les pages et les textes actuels avec la référence médiévale du club.
- [x] Remplacer la voix évocatrice générique par des libellés concis et utiles au club.
- [x] Représenter la sculpture, les arts visuels, la photographie, la musique, la danse, le cinéma, le design, la performance et l’écriture comme disciplines égales du club.
- [x] Créer une place claire pour les cultures, les débats et la philosophie dans les contenus et les parcours du site.
- [x] Recomposer la page d’accueil et les principales pages sous la forme de feuillets, proclamations et registres.
- [x] Vérifier que les motifs médiévaux, les assets et le contenu restent cohérents sur desktop et mobile.

- [x] Préparer et publier les assets médiévaux fournis pour le projet web.
- [x] Recomposer la page d’entrée autour du parchemin, des arcades, de l’emblème et des sceaux.
- [x] Ajouter une page de connexion locale avec retours de validation explicites.
- [x] Relier les actions d’accès et de connexion à la page d’accueil du club.
- [x] Vérifier le portail et la connexion sur desktop et mobile.

## Vérification en cours

Le mot rituel `POIESIS` a été saisi dans les sept alvéoles et a bien ouvert la page d’accueil du club. Les vues desktop et mobile du portail ainsi que la mise en page de connexion ont été contrôlées visuellement. Le formulaire de connexion a aussi été soumis avec des données de démonstration non sensibles et a correctement ouvert l’accueil ; aucune authentification distante n’est simulée.
