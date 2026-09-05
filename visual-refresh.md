# Poiesis visual refresh — implementation brief

## Palette drawn from the official logo

| Token | Value | Use |
| --- | --- | --- |
| **Poiesis Coral** | `#FB573B` | Main calls to action, paper-cut accents and active moments. |
| **Deep Coral** | `#D94338` | Editorial emphasis and accessible contrast on light paper. |
| **Mosaic Violet** | `#5C33D5` | Brand field, links and primary night surface. |
| **Ink Violet** | `#24104C` | Navigation, footer and dark foundation. |
| **Rose Clay** | `#CF7487` | Secondary borders, tags and warm highlights. |
| **Linen Lilac** | `#E8CCC1` | Light paper overlay, body copy support and mosaic softness. |
| **Parchment** | `#F5E7D7` | Main reading surface. |

## Surface hierarchy

The first page will use one deep violet field, one readable parchment field and coral only for decisive actions. This replaces the previous mixture of unrelated navy, brown and muted gold. The logo texture remains visible, but it is contained in tactile paper fragments and does not compete with headings or primary calls to action.

## Paper and overlays

The opening scene will use a single parchment background with three low-contrast layers: a broad cut-paper shape behind the copy, a coral collage strip for the identity note and a small mosaic-violet seal frame. Decorative arches and vines will recede behind a tonal overlay so they support the scene rather than crossing text. CSS-only grain, crease and torn-edge effects avoid new heavy image downloads.

## Image delivery

Each team card will use an optimised WebP source of approximately 28–40 KB with its existing PNG as the fallback. Images retain `loading="lazy"` and explicit dimensions so scrolling remains smooth and avoids layout shift. The preview uses the same smaller WebP files.
