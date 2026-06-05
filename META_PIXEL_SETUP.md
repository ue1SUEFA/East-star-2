# Meta Pixel setup — for the school owner

This guide is for the **school owner** (the person who owns the East Star Instagram account). It walks through creating a Meta Pixel so the website can track who visits from Instagram ads and who submits an application.

> The Pixel is created in **Meta Business Suite**, not inside the Instagram app. Instagram and Facebook are both owned by Meta, so the same Business account controls both.

## What you'll end up with

A **15–16 digit Pixel ID** that looks like `1234567890123456`. Send this number to your developer — they paste it into one configuration file and the website starts reporting:

- How many people visit the site after clicking an Instagram ad
- Which ads actually produce form submissions (leads)
- An audience of past visitors you can re-target with future ads

## Step-by-step

### 1. Make sure your Instagram account is Business or Creator

In the Instagram app:

- Tap your profile → ☰ menu → **Settings and privacy**
- **Account type and tools** → **Switch to professional account**
- Pick **Business** (recommended) and follow the prompts

### 2. Create / open a Meta Business Portfolio

- Open <https://business.facebook.com> in a browser (use the same Facebook login that admins your Instagram, or create a new Facebook account just for the business)
- If you don't have one yet, click **Create account** and name it "East Star"
- Go to **Settings** (gear icon) → **Business settings**

### 3. Connect Instagram inside Business Settings

- In **Business settings** left sidebar → **Accounts** → **Instagram accounts**
- Click **Add** → log in with the school's Instagram credentials → confirm
- Your Instagram is now linked to the Business Portfolio

### 4. Create the Pixel in Events Manager

- Open <https://business.facebook.com/events_manager>
- Click **Connect data sources** → **Web** → **Continue**
- Pick **Meta Pixel** → **Connect**
- Name it: **East Star Website**
- Enter the website URL (the live `https://...` domain, or leave blank if you don't have one yet)
- Click **Continue**

### 5. Copy the Pixel ID

After creation, Events Manager shows the Pixel ID at the top of the page — a 15 or 16 digit number. Copy it.

**Send this number to your developer.** That's all they need on your side.

### 6. (Developer step) Paste the ID into the website config

The developer opens `.env.local` on the server / Vercel and sets:

```
NEXT_PUBLIC_META_PIXEL_ID=1234567890123456
```

Then redeploys. The Pixel is now live.

### 7. Verify it works

Two ways:

**a) Meta Pixel Helper (Chrome extension)** — Install from the Chrome Web Store, open your website, click the icon. You should see your Pixel ID and a green check next to "PageView". Submit the form once — a second event "Lead" should appear.

**b) Events Manager → Test Events tab** — Paste your website URL, click around, submit the form. Within a few seconds you should see `PageView` and then `Lead` events listed.

## After it's working

### Running your first ad

- In Meta Ads Manager, when you create a campaign with the **Leads** objective, select this Pixel as the conversion source. Meta will then optimize delivery toward people likely to fill the form.

### Conversions API (already built in — just add the token)

The browser-side Pixel is good, but iOS Safari and ad blockers prevent maybe 30-40% of events from being reported. The **Conversions API (CAPI)** is a server-side backup that fires the same `Lead` event from our own server, so Meta gets reliable data either way.

This is **already implemented** in the site (`lib/meta-capi.ts`, called from `app/api/lead/route.ts`). The browser and server events share the same `eventId`, so Meta deduplicates them — a normal submit is counted exactly once. It stays dormant until you provide a token:

1. In Events Manager → your Pixel → **Settings** → **Conversions API** → **Generate access token**.
2. Add the token as an environment variable — in **Vercel → Project → Settings → Environment Variables** (and in local `.env.local` for testing):
   ```
   META_CAPI_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxx
   ```
3. Redeploy. Done — no code changes needed.

**To verify CAPI specifically:** Events Manager → **Test events** tab gives you a *Test Event Code*. Temporarily set it as `META_CAPI_TEST_EVENT_CODE=TESTxxxx`, redeploy, submit the form once, and you'll see the **server** `Lead` event appear in that tab (marked "Server"). Remove the variable for production. In the normal **Data sources** view, a healthy setup shows the `Lead` event with both "Browser" and "Server" badges and a high *Event Match Quality* score (we send hashed phone + name, IP, user-agent, and the `_fbp`/`_fbc` cookies).

### Audiences for retargeting

Once the Pixel has been live for a week or two, go to **Audiences → Create Custom Audience → Website** and create audiences like:

- All visitors in the last 30 days
- People who visited but did **not** submit the form (build an audience that includes PageView, excludes Lead)

You can then run cheaper retargeting ads to people who already showed interest.

## Privacy note

Meta Pixel sets cookies and reports browsing behavior to Meta. In the EU / UK this requires a cookie consent banner. If you advertise mainly to Uzbekistan, the legal bar is much lower, but it's still good practice to mention tracking in a short privacy line on the site. The lead form already says "Your details will only be used to contact you." — you may want to expand that.
