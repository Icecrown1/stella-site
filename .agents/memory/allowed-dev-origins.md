---
name: allowedDevOrigins wildcard broken
description: Plain '*' in Next.js allowedDevOrigins does not work as a wildcard — must use explicit domain patterns.
---

## Rule
Use explicit Replit domain patterns in `next.config.js`:

```js
allowedDevOrigins: [
  '*.replit.dev',
  '*.worf.replit.dev',
  '*.repl.co',
  '*.replit.app',
  '127.0.0.1',
]
```

**Why:** Next.js `matchWildcardDomain()` splits the origin by dots and matches segment by segment. A lone `'*'` is treated as a one-segment pattern and matches nothing useful. The Replit preview iframe sends requests with `Origin: https://<id>.worf.replit.dev`; without the correct pattern the dev server blocks all `/_next/*` resources, resulting in unstyled pages.

**How to apply:** Any time Next.js logs `Blocked cross-origin request from *.replit.dev` — check and correct `allowedDevOrigins` in `next.config.js`.
