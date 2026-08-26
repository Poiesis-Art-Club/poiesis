# Mise à jour du portail Poiesis

## Inscription vérifiée et e-mail fiable

- [x] Conserver la confirmation e-mail obligatoire afin de refuser les adresses non vérifiées.
- [x] Ajouter Google OAuth comme voie gratuite d’inscription vérifiée, en conservant la confirmation e-mail pour les comptes e-mail + mot de passe.
- [x] Créer les pages publiques d’accueil, de confidentialité et de conditions requises pour publier Google OAuth.
- [x] Mettre à jour les messages d’inscription pour expliquer la confirmation et le retour durable par mot de passe.
- [x] Vérifier avec un compte Google réel le retour vers Échos et l’ouverture de la session membre sans publication fictive.
- [x] Diagnostiquer et corriger l’erreur 403 signalée lors de la connexion Google hors session de test.
- [x] Comparer la requête OAuth Google générée dans le navigateur qui échoue avec le client et les paramètres actuellement enregistrés.
- [x] Vérifier que le navigateur utilisateur charge la version Poiesis qui force le sélecteur de compte Google.
- [x] Contrôler les paramètres Google, les URL de redirection et les journaux Supabase au moment du refus OAuth.
- [x] Importer le logo officiel Poiesis dans le branding Google OAuth afin de remplacer le monogramme générique.
- [x] Contrôler les repères visuels du portail membre et remplacer tout monogramme générique résiduel par le logo officiel.

Le 26 août 2026, la prévisualisation du portail membre a confirmé que le bouton « Continue with Google » utilise l’emblème officiel Poiesis, en cohérence avec le branding Google OAuth enregistré.
- [x] Contrôler que la version publique ne contient aucun secret, identifiant privé ou configuration de développement exposée.
- [ ] Créer un dépôt GitHub public avec la version validée, prêt pour GitHub Pages et l’import Netlify.
- [ ] Autoriser la création de dépôts publics pour le compte GitHub connecté, puis reprendre l’export Poiesis.
- [x] Préparer les configurations de build et de redirection nécessaires à GitHub Pages et Netlify.
- [x] Adapter le build public afin que GitHub Pages puisse servir l’interface sans exposer ni requérir les secrets d’authentification.

Le build statique a été compilé avec le préfixe `/poiesis-medieval/`, puis servi localement : la route profonde `/poiesis-medieval/login` charge le portail membre, ses assets distants et ses liens internes avec le bon préfixe.

## Limite e-mail et connecteur 21st

- [x] Confirmer que la connexion e-mail et mot de passe remplace le lien magique dans le parcours principal.
- [x] Préparer le connecteur MCP 21st à l’URL officielle avec une clé API utilisateur.
- [x] Vérifier la liste des outils 21st après la connexion du connecteur.

## Connexion durable, thème sombre et Studios

- [x] Remplacer le lien magique limité par une inscription et connexion e-mail + mot de passe Supabase.
- [x] Conserver les sessions membres de façon sécurisée sans stocker de mot de passe dans l’application.
- [x] Corriger le basculement et les contrastes du thème sombre.
- [x] Ajouter aux Studios davantage de pistes pratiques : matière, image, son, scène, artisanat, édition, numérique, cuisine culturelle et collaborations.
- [ ] Tester les parcours inscription, connexion persistante et les thèmes clair/sombre.

### Vérification visuelle en cours

Les Studios enrichis s’affichent avec les huit pistes de pratiques concrètes. Le bouton de thème modifie désormais visiblement les surfaces : violet profond et ivoire en mode sombre, puis feuillet clair lisible après basculement.

Le portail membre affiche bien un choix « Sign in / Create account » et l’inscription ajoute un second champ de confirmation de mot de passe, sans proposer de lien magique comme parcours principal.

Le 26 août 2026, la connexion Google réelle a ouvert une session Supabase et a renvoyé directement vers Échos ; l’archive identifie le membre connecté sans publication de démonstration. Le basculement clair/sombre a également été vérifié dans cette session et le réglage clair initial a été restauré.

Le formulaire bloque localement deux mots de passe différents avant tout appel Supabase et affiche un retour clair. La création réelle d’un compte n’a pas été simulée afin de ne pas créer de membre fictif ni consommer la limite e-mail ; un membre réel peut finaliser son mot de passe depuis sa session confirmée.

Le connecteur MCP 21st est activé et connecté. Après rafraîchissement de session, son contrôle a confirmé 35 outils disponibles, puis une recherche réelle non destructive a été exécutée avec succès ; aucun résultat correspondant à « medieval parchment » n’a été retourné.

Le parcours Google force désormais `prompt=select_account`. L’URL OAuth générée par Supabase a été contrôlée après cette modification : elle ouvre bien le sélecteur de compte Google avec le même client et le même URI de rappel enregistrés. La confirmation depuis le navigateur du propriétaire reste à recueillir pour fermer l’incident 403.

Le propriétaire a confirmé que le test avec l’URL de prévisualisation redémarrée fonctionne. L’incident 403 est donc résolu : le sélecteur de compte Google et la connexion membre sont à nouveau accessibles.

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
