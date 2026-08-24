# 11 — Deployment Guide

Target: **Vercel**, serving **orbisojas.com**.

## Vercel project

| Setting | Value |
| --- | --- |
| Framework | Next.js (auto-detected) |
| **Root Directory** | `web` |
| Build command | `next build` (default) |
| Node | 22.x or later |

The root directory is the one setting that is easy to get wrong — the repo root is not the app.

## Environment variables

| Variable | Purpose | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Delivers request-form submissions | **Yes** |

Without it the form fails gracefully — "The request form isn't connected yet. Please email us directly." — rather than silently losing a lead. Get a free key at web3forms.com and set it for Production and Preview.

Locally, `web/.env.local`:

```
NEXT_PUBLIC_WEB3FORMS_KEY=your-key-here
```

> This key is public by design (`NEXT_PUBLIC_`). Web3Forms keys are safe to expose; they only route to an inbox. Do not put anything secret behind that prefix.

## Pre-deploy

```bash
cd web
npx tsc --noEmit
npx next build
npx next start -p 3100
```

Then against `localhost:3100`, not the dev server:

- [ ] Lighthouse ≥ 99 desktop, ≥ 95 mobile on `/`, `/soul-mirror`, `/atlas`
- [ ] Rich Results Test: Product, FAQPage, HowTo, Article
- [ ] `/sitemap.xml` lists 12 URLs (3 pages + 9 Atlas entries)
- [ ] `/robots.txt` and `/llms.txt` resolve
- [ ] Submit a real form entry and confirm it arrives
- [ ] Keyboard-only pass on all three pages
- [ ] 375 / 768 / 1440 / 2560 — no horizontal scroll
- [ ] View source with JS disabled: all copy present *and visible*

## DNS cutover

Confirm where orbisojas.com is currently managed before changing anything.

**Apex** — `A` record to Vercel's IP, or `ALIAS`/`ANAME` to `cname.vercel-dns.com` if the registrar supports it.
**www** — `CNAME` to `cname.vercel-dns.com`. Redirect www → apex (or the reverse) so only one host is canonical; two live hosts split ranking signals.

Vercel shows the exact records once the domain is added — use those, not these, if they differ.

**If DNS is on Cloudflare:** set those records to **DNS-only (grey cloud)**, not proxied. Proxying in front of Vercel breaks certificate issuance and adds a redundant hop. The Cloudflare connectors in this workspace need authorising before they can be driven from here.

Lower TTL to 300s a day ahead so a rollback is fast.

## After cutover

1. Verify HTTPS and that the certificate covers both apex and www.
2. Confirm `SITE.url` in `constants/nav.ts` matches the live host exactly — it drives every canonical and every schema `@id`.
3. Google Search Console + Bing: verify, submit the sitemap.
4. IndexNow ping.
5. Re-run Lighthouse against production.
6. Archive `website/` — it is superseded, not deleted, until the new site has been live and indexed for a fortnight.

## Rollback

The static site in `website/` is a complete, working v1. If something is badly wrong, repoint DNS at the old host; nothing in `web/` touches it.

Vercel keeps every deployment — instant rollback from the dashboard is faster than a DNS change and should be the first move.
