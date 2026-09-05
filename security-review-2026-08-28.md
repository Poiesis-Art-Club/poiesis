# Revue de sécurité locale — 28 août 2026

## Périmètre

Cette revue a été exécutée sur une **copie isolée** du projet, créée sans fichiers d’environnement, sans historique Git, sans build existant et sans contact avec la base de données, les comptes membres ou les services de production. Les scénarios étaient volontairement adverses mais bornés : aucune donnée réelle n’a été créée, modifiée ou supprimée.

## Résultats des tests

| Contrôle | Méthode isolée | Résultat |
| --- | --- | --- |
| Régression locale | Tests Vitest hors contrôle Supabase distant | 10 tests locaux réussis dans la copie isolée. |
| Tolérance au manque de configuration | Build statique sans URL, clé Supabase, clés Forge, base ni secret de session | Build statique réussi ; la configuration Supabase manquante est traitée par l’interface plutôt que par un crash de build. |
| Accès invité | Appel de création Écho avec un contexte absent | Refusé avant tout appel de stockage. |
| Entrées hostiles | Champs vides, surdimensionnés, `NaN` et données ne respectant pas le schéma | Refusés par les bornes Zod avant le stockage simulé. |
| Injection de protocole | URL `javascript:`, `data:` et `file:` | Vulnérabilité détectée puis corrigée : seules les URL HTTP(S) sont maintenant acceptées et affichées. |
| Défaillance de code | Faute TypeScript injectée dans la copie, puis restauration du fichier | Le contrôle de types a échoué comme attendu ; après restauration, il réussit de nouveau. |
| Affichage HTML direct | Recherche des principaux sinks `dangerouslySetInnerHTML` et `innerHTML` dans les fichiers TypeScript | Aucun résultat trouvé. |
| Liens externes | Revue des liens ouvrant un nouvel onglet | Les liens inspectés utilisent `rel="noreferrer"`. |
| Secrets de code et de build | Scan borné des fichiers TypeScript et JSON, puis des artefacts de build statique, pour clés privées, clés AWS, clés privilégiées Supabase et clés de type `sk_*` | Aucun motif correspondant n’a été trouvé dans les sources ni les artefacts scannés. |
| Dépendances de production | Audit du registre de vulnérabilités depuis la copie isolée | 72 avis : 17 élevés, 47 modérés et 8 faibles, répartis sur 14 modules uniques. |
| Compatibilité des mises à jour | Application des mises à jour proposées **dans la copie isolée uniquement** | 14 tests et le build statique réussissent après mise à jour ; le projet actif n’a pas été modifié par cet essai. |

## Correctifs appliqués

Le nouvel utilitaire `toSafeExternalUrl` normalise les liens et refuse tout protocole autre que HTTP ou HTTPS. La page Échos bloque les liens dangereux avant insertion et ne rend pas les anciens liens stockés qui ne satisfont pas cette même règle. Le routeur tRPC Échos porte la même contrainte côté serveur et des tests de régression couvrent les protocoles `javascript:`, `data:` et `file:`.

La configuration locale du futur hébergement inclut également des en-têtes de production : politique de sécurité du contenu, anti-frames, anti-MIME-sniffing, politique de référent et restrictions de permissions. Elle reste **non active tant qu’aucun déploiement n’est autorisé**.

## Limites et suivi requis

| Élément | État | Suite recommandée |
| --- | --- | --- |
| Politiques RLS Supabase | Non interrogées afin de ne pas toucher au service réel | Vérifier les politiques dans la console Supabase lors d’une session de maintenance explicitement autorisée. |
| En-têtes sur la prévisualisation | Le serveur de développement ne sert pas les en-têtes Netlify préparés | Contrôler les en-têtes sur le domaine de production **après** une publication explicitement autorisée. |
| Vulnérabilités de dépendances | La mise à niveau locale a corrigé les avis élevés initiaux dans `axios`, `drizzle-orm`, `nanoid`, `path-to-regexp`, `lodash` et `lodash-es`, puis `mdast-util-to-hast` vers 13.2.1 | L’audit de production final indique 0 avis élevé, 0 critique et 0 faible ; 1 avis modéré est désormais résiduel et doit être recontrôlé si les dépendances évoluent. |
| Texture historique obsolète | L’ancien chemin reste dans une règle CSS non active et provoque un avertissement de build | Retirer cette référence avant la prochaine publication. |

> Le scan de secrets recherche des signatures privilégiées connues et ne remplace pas une revue manuelle des variables d’environnement ni un audit de l’hébergeur. Les valeurs prévues pour être publiques dans un client, telles qu’une clé de publication Supabase, ne sont pas assimilées à des secrets privilégiés par ce contrôle.

## Conclusion

Les tests locaux confirment la résistance des contrôles de type, des limites de saisie, de l’accès invité et du build sans secrets. Un vecteur concret de lien exécutable a été identifié et corrigé sans accéder à une donnée réelle. La mise à niveau contrôlée du projet actif a réduit l’audit de production à 0 avis élevé, 0 critique et 0 faible ; il reste 1 avis modéré documenté par le registre. Express 5 a nécessité la migration des wildcards vers `/{*splat}` et du proxy de stockage vers `/*splat`, validée par démarrage du serveur et smoke test visuel. Cette revue ne constitue pas un test d’intrusion de l’infrastructure Supabase ou d’un domaine publié.
