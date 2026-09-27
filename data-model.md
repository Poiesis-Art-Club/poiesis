# Modèle de données — Poiesis

## Principes

Poiesis uses Supabase Auth for member accounts and a private Studio feed. Announcements, dates and event registrations remain on Instagram.

| Entité | Rôle | Données principales |
|---|---|---|
| `users` | Compte d’authentification géré par le système membre | ID, email, identité de session |
| `profiles` | Member name shown beside shared work | Auth user ID, display name, optional bio and practices |
| `echoes` | Artwork post or creative prompt | ID, author, kind (`artwork` or `prompt`), title, practice, description, optional external URL and private media path/type, creation date |
| `echo_comments` | Comment on an artwork or prompt | ID, Echo ID, author, content and creation date |
| `echo-media` (Storage) | Private image and video attachments | Authenticated member uploads, limited to 50 MB and image/video formats |

## Règles d’accès

Posts, comments and media are available only to authenticated members. Members publish as themselves. Only the author can edit or remove their post or remove their comment/media. The feed creates short-lived signed media links for display.

## États éditoriaux

Artwork and prompt posts share the same feed, and every post has its own comment thread. The interface does not insert sample contributions.
