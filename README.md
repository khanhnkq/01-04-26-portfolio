# Khanh Nguyen Kim — Portfolio

Next.js 16 portfolio with a SePay-verified “Buy me a coffee” flow backed by Neon Postgres.

## Local development

```bash
npm install
cp .env.example .env.local
npm run db:migrate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Donate configuration

Create a pooled connection string in Neon and set the following server-side variables in `.env.local` and in the deployment environment:

```dotenv
DATABASE_URL=postgresql://...
SEPAY_WEBHOOK_SECRET=...
SEPAY_API_TOKEN=...
SEPAY_API_BASE_URL=https://userapi.sepay.vn/v2
CRON_SECRET=...
DONATE_BANK_CODE=MBBank
DONATE_ACCOUNT_NO=...
DONATE_ACCOUNT_NAME=...
```

Never prefix these variables with `NEXT_PUBLIC_` and never commit their values.

In SePay:

1. Link the receiving bank account.
2. Configure payment codes with prefix `CF` and an eight-digit numeric suffix.
3. Create an **incoming transfer** webhook for `https://YOUR_DOMAIN/api/webhooks/sepay`.
4. Select JSON and HMAC-SHA256 authentication, then copy the same secret into `SEPAY_WEBHOOK_SECRET`.
5. Use **Send test** and confirm the endpoint returns HTTP 200 with `{ "success": true }`.

The webhook checks the raw-body HMAC and five-minute timestamp window before parsing JSON. A donation is published only when the receiving account, payment code and exact amount match. `sepay_transactions.sepay_id` is the idempotency key.

## Database

The schema lives in `src/db/schema.ts`; generated SQL migrations live in `drizzle/`.

```bash
npm run db:generate
npm run db:migrate
npm run db:studio
```

The initial migration creates:

- `donations`: pending/paid state and public supporter messages.
- `sepay_transactions`: immutable transaction matching/audit records.

## Reconciliation

`vercel.json` schedules `/api/cron/reconcile-sepay` daily. Vercel sends `Authorization: Bearer $CRON_SECRET`; the endpoint queries the last 48 hours from SePay API v2 and reuses the same idempotent database processor as the webhook.

For non-Vercel deployments, call the endpoint from another scheduler with the same authorization header.

## Verification

```bash
npm test
npm run lint
npm run build
```

Before production, verify in this order:

1. Unit tests with local fixtures.
2. SePay Test mode with a simulated transaction.
3. A small real transfer over the production HTTPS webhook.
