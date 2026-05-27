# Telegram setup — step by step

You need **two values** from Telegram: a **bot token** (so our website can send messages) and a **chat ID** (which chat the messages go to). Total time: ~5 minutes.

## Part 1 — Create the bot (get the token)

1. Open Telegram and search for **`@BotFather`** (official, has a blue checkmark). Open the chat.
2. Send `/start` if it's your first time.
3. Send `/newbot`.
4. BotFather asks for a **name** (any display name, e.g. `East Star Leads`).
5. BotFather asks for a **username** — must end in `bot`. For example: `EastStarLeadsBot` or `east_star_leads_bot`. If taken, try another.
6. BotFather replies with a message like:

   ```
   Done! Congratulations on your new bot.
   ...
   Use this token to access the HTTP API:
   1234567890:AAExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ...
   ```

7. **Copy that token.** Treat it like a password — anyone who has it can send messages as your bot.

Save it as `TELEGRAM_BOT_TOKEN` in `.env.local`.

## Part 2 — Create the chat and get its ID

You have two choices for *where* the leads land. **A group is recommended** — multiple staff can see leads and respond.

### Option A (recommended) — A private group with the bot

1. In Telegram, create a **new group**. Name it e.g. `East Star — Leads`.
2. Add at least one other person (Telegram requires ≥1 other member to create a group). You can remove them later.
3. Add your bot to the group: **group settings → Add members → search the bot's username → Add**.
4. **Important:** Send any message in the group (e.g. just type `hi`). Without at least one message, the next step returns nothing.
5. Open this URL in your browser, replacing `<TOKEN>` with the token from Part 1:

   ```
   https://api.telegram.org/bot<TOKEN>/getUpdates
   ```

   Example:

   ```
   https://api.telegram.org/bot1234567890:AAExxxxxxxxxxxxx/getUpdates
   ```

6. You'll see JSON like:

   ```json
   {
     "ok": true,
     "result": [
       {
         "update_id": 123456789,
         "message": {
           ...
           "chat": {
             "id": -1001234567890,
             "title": "East Star — Leads",
             "type": "supergroup"
           },
           ...
         }
       }
     ]
   }
   ```

7. Copy the `chat.id` value — for groups it's a **negative number** like `-1001234567890`. Include the minus sign.

Save it as `TELEGRAM_CHAT_ID` in `.env.local`.

### Option B — Just send to yourself (personal chat)

1. In Telegram, find your bot by username (from Part 1 step 5).
2. Open the chat and tap **Start** (or send `/start`).
3. Visit `https://api.telegram.org/bot<TOKEN>/getUpdates` — the `chat.id` will be a **positive number** like `987654321`. That's your personal Telegram user ID.

## Part 3 — Wire it into the app

In the project folder:

```powershell
Copy-Item .env.local.example .env.local
notepad .env.local
```

Paste both values:

```
TELEGRAM_BOT_TOKEN=1234567890:AAExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TELEGRAM_CHAT_ID=-1001234567890
```

Save. Then:

```powershell
npm run dev
```

Open <http://localhost:3000>, scroll to the form, submit a test entry. Within ~2 seconds you should see a message in the Telegram group like:

```
🎓 East Star — new application

Name: Aziza
Phone: +998901234567
Language: uz
Time (Tashkent): 15.05.2026, 14:32:05
```

## When you deploy

The `.env.local` file only works locally. On a host like Vercel, add the same two variables in the host's **Environment Variables** UI — do NOT commit `.env.local` to git. The `.gitignore` already excludes it.

## Common problems

| Problem | Fix |
|---|---|
| `getUpdates` returns `"result": []` | You haven't sent a message in the group yet, or the bot was added but never received an event. Send any message in the group, then refresh. |
| `Telegram delivery failed` in the app | Token typo, chat ID typo, or you forgot to add the bot to the group. Re-check both. |
| Bot can't write in group with topics | Open group settings → Permissions → make sure the bot can send messages. |
| Messages stopped arriving after `/revoke` | If you revoked the token via BotFather, generate a new one and update `.env.local` (and your host's env vars). |

## Security reminders

- The **bot token** is a secret — never paste it in screenshots, public chats, or commit it to git.
- If a token leaks, immediately tell `@BotFather` → `/mybots` → pick bot → **API Token** → **Revoke current token**.
- The `.env.local` file is already in `.gitignore`. Keep it that way.
