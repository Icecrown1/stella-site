---
name: Dev styles break after build
description: Running npm run build during task work causes styles to disappear in the dev preview after workflow restart.
---

## Rule
Always `rm -rf .next` before restarting the dev workflow whenever `npm run build` was run in the same session.

**Why:** `next build` writes production asset hashes into `.next`. When `next dev` restarts it expects its own incremental hashes; the browser caches the old ones and gets 404s for CSS/JS chunks, so the page renders unstyled.

**How to apply:** After any `npm run build` call (e.g. during task verification), run:
```
rm -rf .next && fuser -k 5000/tcp 2>/dev/null
```
then restart the "Start application" workflow.
