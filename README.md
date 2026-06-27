# Treasure House of God — Website (Next.js + Payload CMS)

The production codebase for the new RCCG Treasure House of God website. It's a single
**Next.js (App Router)** app with **Payload CMS** built in, so the public site and the
admin panel run from one project.

- **Public site:** `http://localhost:3000`
- **Admin / CMS:** `http://localhost:3000/admin`

---

## 1. Requirements
- **Node.js 20+** (check with `node -v`)
- npm (comes with Node)

## 2. First-time setup
```bash
# 1. install dependencies (this also downloads the local database engine)
npm install

# 2. create your env file and add a secret
cp .env.example .env
#   then open .env and set PAYLOAD_SECRET to a long random string, e.g.
#   openssl rand -base64 32

# 3. start the app
npm run dev
```
Open **http://localhost:3000/admin** and create your first admin account when prompted
(or run `npm run seed` to create a default one).

That's it — the site uses a local **SQLite** database file (`thg.db`), so there's nothing
else to install for local development.

## 3. Useful commands
| Command | What it does |
|---|---|
| `npm run dev` | Start the site + CMS in development |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run generate:types` | Regenerate `src/payload-types.ts` after changing collections |
| `npm run seed` | Create a default admin user |

---

## 4. What's in here

```
src/
├─ app/
│  ├─ (frontend)/         ← the public website
│  │  ├─ layout.tsx       ← header, footer, global CSS, card-tilt script
│  │  ├─ globals.css      ← the full design system (ported from the approved mockup)
│  │  ├─ page.tsx         ← Home
│  │  ├─ about/ departments/ events/ sermons/ devotionals/ give/ contact/ im-new/
│  └─ (payload)/          ← the admin panel + API (standard Payload files)
├─ components/            ← Header, Footer, TiltCards
├─ collections/           ← the CMS content model (see below)
├─ globals/               ← ServiceTimes, SiteSettings
└─ payload.config.ts      ← Payload configuration
public/
├─ rccg-emblem.png, fonts/, assets/ (animated placeholders), images/ (your photos)
```

### Content model (what admins can edit)
| Collection | Purpose |
|---|---|
| **Pages** | Editable text for About, I'm New, Give, Contact |
| **Departments** | Ministries & serving teams (cards) |
| **Events** | Dated events with registration |
| **Sermons** | Messages (YouTube/audio links) |
| **Devotionals** | Daily devotionals |
| **Media Library** | Uploaded photos & PDFs |
| **Team & Admins** | Login accounts |
| **Service Times** *(global)* | Weekly/monthly gatherings |
| **Site Settings** *(global)* | Contact, socials, giving, charity/company numbers |

---

## 5. Honest status & next steps

- **Backend (Payload):** complete — collections, globals, admin, SQLite, all configured.
- **Frontend:** the full approved design is ported and renders with the real content
  baked in (so it looks finished immediately). **Wiring each page to read live data from
  Payload** is the next increment — the collections are ready; it's a matter of swapping
  the hardcoded content for Payload queries (pattern below).
- ⚠️ **Not yet run here:** this was generated in an environment without a full npm install,
  so the **first `npm install && npm run dev` on your machine is the validation step.**
  If anything errors on first run, send me the message and I'll fix it fast.

### Example — wiring a page to the CMS (for later)
```ts
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function EventsPage() {
  const payload = await getPayload({ config })
  const { docs: events } = await payload.find({ collection: 'events', sort: 'date' })
  // ...render events
}
```

### Images
Drop real photos into `public/images/` and swap the placeholder `src`s.
See **`../../04_New_Build/Stock-Image-Sourcing-Guide.md`** for free, on-theme image sources.

---

## 6. Going live (after local review)
1. Push this folder to a **GitHub** repo.
2. Import the repo into **Vercel**.
3. Swap SQLite for a managed **Postgres** DB (Vercel Postgres / Neon) — change the adapter
   in `payload.config.ts` to `@payloadcms/db-postgres` and set `DATABASE_URI`.
4. Set `PAYLOAD_SECRET`, `DATABASE_URI`, `NEXT_PUBLIC_SERVER_URL` as Vercel env vars.
5. Point the new domain. Every push gets a preview URL for leadership to review.
