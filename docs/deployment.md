# Deployment PDAMCore Marketing Web

Dokumen ini menjelaskan baseline deployment untuk website marketing dan edukasi
PDAMCore. Aplikasi operasional tetap berada di `app.pdamcore.id`.

## Target Runtime

- Node.js 22
- Next.js standalone output
- Docker image non-root
- Health endpoint: `/api/health`
- Public site: `https://pdamcore.id`
- Operational app redirect: `https://app.pdamcore.id`

## Environment Variables

| Variable | Required | Build-time | Runtime | Catatan |
|---|---:|---:|---:|---|
| `NEXT_PUBLIC_SITE_URL` | Ya | Ya | Ya | Domain marketing, default `https://pdamcore.id`. |
| `NEXT_PUBLIC_APP_URL` | Ya | Ya | Ya | Target redirect `/login`, default `https://app.pdamcore.id`. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Ya | Ya | Ya | Nomor CTA WhatsApp, default `6289512728534`. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Ya | Ya | Ya | Email kontak publik. |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Tidak | Ya | Ya | Default `true` untuk Plausible domain `pdamcore.id`. |
| `NEXT_PUBLIC_ANALYTICS_ID` | Tidak | Ya | Ya | Legacy GA measurement id. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Tidak | Ya | Ya | GA4 measurement id. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Tidak | Ya | Ya | Domain Plausible, default `pdamcore.id`. |
| `LEAD_STORAGE_DIR` | Ya | Tidak | Ya | Direktori JSONL lead capture, default Docker `/app/data/leads`. |
| `LEAD_PRIVACY_SALT` | Ya | Tidak | Ya | Secret untuk hashing IP/fingerprint. Jangan commit nilai production. |
| `LEAD_FORM_MIN_AGE_MS` | Tidak | Tidak | Ya | Anti-spam timing guard, default `1200`. |
| `LEAD_FORM_MAX_AGE_MS` | Tidak | Tidak | Ya | Masa berlaku form, default 24 jam. |
| `DEMO_REQUEST_WEBHOOK_URL` | Tidak | Tidak | Ya | Endpoint server-side untuk form demo. |
| `DEMO_REQUEST_WEBHOOK_TOKEN` | Tidak | Tidak | Ya | Bearer token webhook demo. |
| `CONTACT_REQUEST_WEBHOOK_URL` | Tidak | Tidak | Ya | Endpoint server-side untuk form kontak. |
| `CONTACT_REQUEST_WEBHOOK_TOKEN` | Tidak | Tidak | Ya | Bearer token webhook kontak. |

Nilai `NEXT_PUBLIC_*` dibutuhkan saat build karena sebagian dipakai oleh client
bundle. Jika nilai public berubah, rebuild image agar UI dan metadata konsisten.

## Lead Capture & Anti-Spam

Form demo dan kontak sekarang memiliki tiga lapis perlindungan:

1. Validasi Zod server-side.
2. Honeypot, timing guard, dan rate limit per fingerprint/nomor WhatsApp.
3. Penyimpanan lead JSONL di `LEAD_STORAGE_DIR` sebelum webhook opsional.

Format file lead:

```txt
/app/data/leads/YYYY-MM-DD-demo.jsonl
/app/data/leads/YYYY-MM-DD-contact.jsonl
```

Set `LEAD_PRIVACY_SALT` dengan secret acak yang panjang agar hash IP/fingerprint
tidak mudah ditebak. Backup volume `/app/data` secara berkala jika Docker Compose
menjadi runtime production utama.

Siapkan file environment production di server:

```bash
cp .env.production.example .env.production
sed -i "s/^LEAD_PRIVACY_SALT=.*/LEAD_PRIVACY_SALT=$(openssl rand -hex 32)/" .env.production
```

Jangan commit `.env.production`; file tersebut sudah diabaikan oleh `.gitignore`.

## Local Quality Gates

Jalankan sebelum membuat image atau deploy:

```bash
npm ci
npm audit --audit-level=high
npm run lint
npm run typecheck
npm test
npm run build
```

## Docker Build

```bash
docker build \
  --build-arg NPM_CONFIG_STRICT_SSL=true \
  --build-arg NEXT_PUBLIC_SITE_URL=https://pdamcore.id \
  --build-arg NEXT_PUBLIC_APP_URL=https://app.pdamcore.id \
  --build-arg NEXT_PUBLIC_WHATSAPP_NUMBER=6289512728534 \
  --build-arg NEXT_PUBLIC_CONTACT_EMAIL=info@pdamcore.id \
  --build-arg NEXT_PUBLIC_ANALYTICS_ENABLED=true \
  --build-arg NEXT_PUBLIC_PLAUSIBLE_DOMAIN=pdamcore.id \
  -t pdamcore-marketing-web:latest .
```

Jika build lokal berada di jaringan yang melakukan TLS inspection dan container
tidak memiliki CA internal, gunakan sementara:

```bash
docker build --build-arg NPM_CONFIG_STRICT_SSL=false -t pdamcore-marketing-web:local .
```

Untuk CI dan production, pertahankan default `NPM_CONFIG_STRICT_SSL=true` atau
pasang CA internal ke image builder.

Run image:

```bash
docker run --rm -p 3000:3000 \
  -v pdamcore-marketing-leads:/app/data \
  -e NEXT_PUBLIC_SITE_URL=https://pdamcore.id \
  -e NEXT_PUBLIC_APP_URL=https://app.pdamcore.id \
  -e NEXT_PUBLIC_WHATSAPP_NUMBER=6289512728534 \
  -e NEXT_PUBLIC_CONTACT_EMAIL=info@pdamcore.id \
  -e NEXT_PUBLIC_ANALYTICS_ENABLED=true \
  -e NEXT_PUBLIC_PLAUSIBLE_DOMAIN=pdamcore.id \
  -e LEAD_STORAGE_DIR=/app/data/leads \
  -e LEAD_PRIVACY_SALT="$(openssl rand -hex 32)" \
  pdamcore-marketing-web:latest
```

## Docker Compose

```bash
docker compose --env-file .env.production up -d --build
docker compose ps
curl -f http://127.0.0.1:3000/api/health
docker compose exec pdamcore-marketing-web ls -la /app/data/leads
```

`docker-compose.yml` sengaja mewajibkan `LEAD_PRIVACY_SALT`. Deploy akan gagal
sebelum container berjalan jika secret ini kosong atau tidak diset.

Respons `/api/health` harus memuat `status: "ok"`, check
`leadPrivacySalt.status: "ok"`, dan `leadStorage.status: "ok"`. Jika secret
tidak valid atau storage tidak writable, endpoint akan mengembalikan HTTP `503`
agar reverse proxy/orchestrator tidak menganggap instance siap menerima lead
form.

Gunakan reverse proxy seperti NGINX, Caddy, Traefik, atau load balancer cloud
untuk TLS dan domain `pdamcore.id`.

## CI Gates

GitHub Actions menjalankan:

1. `npm ci`
2. `npm audit --audit-level=high`
3. `npm run lint`
4. `npm run typecheck`
5. `npm test`
6. `npm run build`
7. `docker build`

Pipeline harus gagal jika salah satu gate gagal.

## Release Checklist

- Pastikan domain `pdamcore.id` mengarah ke reverse proxy atau platform hosting.
- Set semua public env sesuai environment target sebelum build.
- Set `LEAD_PRIVACY_SALT` sebagai secret production.
- Pastikan volume `/app/data` persisten dan masuk backup rutin.
- Set webhook token hanya di secret manager atau environment server, bukan di repo.
- Verifikasi `/`, `/fitur`, `/solusi`, `/edukasi`, `/demo`, `/kontak`, `/privacy`.
- Verifikasi `/login` redirect ke `NEXT_PUBLIC_APP_URL`.
- Verifikasi `/sitemap.xml` dan `/robots.txt`.
- Verifikasi `/api/health` mengembalikan status `ok`,
  `leadPrivacySalt.status` bernilai `ok`, dan `leadStorage.status` bernilai
  `ok`.
- Verifikasi form demo/kontak menulis file JSONL di `LEAD_STORAGE_DIR`.
- Verifikasi analytics Plausible/GA sesuai kebijakan internal.

## Rollback

- Simpan tag image per release, misalnya `pdamcore-marketing-web:2026-06-19-1`.
- Jika release gagal, redeploy tag image sebelumnya.
- Jangan mengubah secret atau webhook target saat rollback kecuali memang sumber masalahnya konfigurasi environment.
- Setelah rollback, cek `/api/health`, `/login`, form demo, form kontak, dan CTA WhatsApp.
