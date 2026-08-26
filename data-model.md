# Modèle de données — Poiesis

## Principes

Poiesis est une landing page de club. Les annonces, les dates et les inscriptions restent sur Instagram. La base de données sert exclusivement aux comptes membres et aux Échos publiés par les membres.

| Entité | Rôle | Données principales |
|---|---|---|
| `users` | Compte d’authentification géré par le système membre | ID, email, identité de session |
| `profiles` | Présentation publique facultative du membre | ID utilisateur, nom d’affichage, bio courte, pratique(s), date de création |
| `echoes` | Publication d’un travail ou d’une proposition | ID, auteur, titre, pratique, description, lien externe facultatif, statut, dates |
| `echo_comments` | Réponse constructive à un Écho | ID, Écho, auteur, contenu, date de création |

## Règles d’accès

Les Échos publiés sont visibles par les membres connectés. Seul l’auteur peut modifier ou supprimer son Écho ; seul l’auteur d’un commentaire peut modifier ou supprimer son commentaire. Les visiteurs voient la landing page et sont invités à créer un compte pour accéder à l’espace Échos.

## États éditoriaux

Les publications sont créées comme `published`. Un futur rôle d’administration pourra ajouter une modération, mais aucune publication fictive ne sera créée pour présenter l’interface.
