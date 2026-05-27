# East Star — School Landing Page

Trilingual (Uzbek / Russian / English) landing page for **East Star**, a private school in Tashkent. Visitors leave their name and phone number; the request is delivered to a Telegram chat for follow-up.

## What's inside

- **Next.js 15** (App Router) + **React 19** + **TypeScript** + **Tailwind CSS v4**
- One landing page with: hero, about, programs, why-us, teachers, facilities, contact, and a lead form
- Lead form (`name` + `phone`) → `POST /api/lead` → Telegram `sendMessage`
- Built-in `+998` phone validation
- Honeypot field + per-IP rate limit (5 / 10 min) for spam protection
- Three languages: `/uz` (default), `/ru`, `/en`

## Folder layout

```
east-star/
├── app/
│   ├── layout.tsx                Root passthrough layout
│   ├── page.tsx                  Redirects "/" → "/uz"
│   ├── globals.css               Tailwind import + theme tokens
│   ├── [lang]/
│   │   ├── layout.tsx            <html lang="..."> + metadata
│   │   └── page.tsx              The full landing page
│   └── api/
│       └── lead/route.ts         POST handler → Telegram
├── components/                   Hero, About, Programs, WhyUs, etc.
├── lib/
│   ├── dictionaries.ts           All UZ/RU/EN copy (edit me!)
│   └── validation.ts             Name + Uzbek phone validators
├── .env.local.example            Copy → .env.local and fill in
└── TELEGRAM_SETUP.md             Step-by-step bot setup guide
```

## Local setup

### 1. Install Node.js

This machine doesn't have Node.js yet. Download **Node 20 LTS or newer** from <https://nodejs.org> and install. Open a new PowerShell window so the new `node` / `npm` end up on PATH:

```powershell
node -v
npm -v
```

Both should print a version.

### 2. Install dependencies

From this folder:

```powershell
npm install
```

### 3. Set up Telegram

Open [TELEGRAM_SETUP.md](./TELEGRAM_SETUP.md) and follow the steps to get your **bot token** and **chat ID**.

Then copy the env file and paste your values:

```powershell
Copy-Item .env.local.example .env.local
notepad .env.local
```

Fill in:

```
TELEGRAM_BOT_TOKEN=1234567890:AAExxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TELEGRAM_CHAT_ID=-1001234567890
```

### 4. Run the dev server

```powershell
npm run dev
```

Open <http://localhost:3000>. You'll be redirected to `/uz`. Switch languages with the UZ / RU / EN toggle in the header.

Submit the form once — within 1–2 seconds a message should appear in your Telegram chat.

## Editing content

All text lives in [lib/dictionaries.ts](./lib/dictionaries.ts) — three sister objects (`uz`, `ru`, `en`) with the exact same shape. To change a heading, edit the string in all three languages. To update the address / phone / email, edit the `contact` block.

Brand color is controlled by the `--color-brand-*` tokens in [app/globals.css](./app/globals.css).

## Deploying

### Easiest: Vercel (free tier)

1. Push this folder to a GitHub repo.
2. Go to <https://vercel.com/new>, import the repo.
3. In **Environment Variables**, add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.
4. Click Deploy. Vercel gives you a `https://east-star.vercel.app` URL.
5. Connect your custom domain (e.g. `eaststar.uz`) in Vercel's domain settings.

### Alternative: Docker / VPS

If you prefer a VPS:

```powershell
npm run build
npm run start    # runs on port 3000
```

Put it behind nginx / Caddy with HTTPS.

## Spam protection

The `/api/lead` route already has:

- **Validation** — name 2–80 chars, phone must match `+998` + 9 digits
- **Honeypot** — hidden `website` field; bots that auto-fill it get silently dropped
- **Rate limit** — 5 submissions per IP per 10 minutes

If you start getting spam, options:

- Add **reCAPTCHA v3** or **Cloudflare Turnstile** (recommended)
- Tighten the rate limit
- Block specific IPs at the host / CDN layer

## Updating Instagram link

The footer has a generic `https://instagram.com/` link — edit [components/Footer.tsx](./components/Footer.tsx) and replace with the school's actual handle.
