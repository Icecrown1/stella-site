---
name: layout.tsx wipe risk
description: app/layout.tsx can get reset to a bare Next.js default, losing globals.css import and all metadata — the most common cause of total style loss.
---

## Rule
When styles vanish completely, check `app/layout.tsx` first — specifically that:
1. `import "./globals.css"` is present on line 3
2. Font variable declarations (Unbounded, Manrope) are intact
3. The full `metadata` export with OG/Twitter/canonical is present
4. `<html lang="ru" className={...}>` uses the font variables

**Why:** During plan-mode sessions or certain Replit workspace operations, `app/layout.tsx` was observed to silently revert to the bare Next.js default (`export const metadata = { title: 'Next.js', ... }`). Without `globals.css` import, Tailwind never loads — the page renders completely unstyled.

**How to apply:** Whenever the user reports broken styles and `rm -rf .next` + workflow restart doesn't fix it, immediately read `app/layout.tsx` and check the import on line 3.
