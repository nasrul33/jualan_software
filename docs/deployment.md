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
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Tidak | Ya | Ya | Set `true` hanya jika analytics sudah siap. |
| `NEXT_PUBLIC_ANALYTICS_ID` | Tidak | Ya | Ya | Legacy GA measurement id. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Tidak | Ya | Ya | GA4 measurement id. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Tidak | Ya | Ya | Domain Plausible, default `pdamcore.id`. |
| `DEMO_REQUEST_WEBHOOK_URL` | Tidak | Tidak | Ya | Endpoint server-side untuk form demo. |
| `DEMO_REQUEST_WEBHOOK_TOKEN` | Tidak | Tidak | Ya | Bearer token webhook demo. |
| `CONTACT_REQUEST_WEBHOOK_URL` | Tidak | Tidak | Ya | Endpoint server-side untuk form kontak. |
| `CONTACT_REQUEST_WEBHOOK_TOKEN` | Tidak | Tidak | Ya | Bearer token webhook kontak. |

Nilai `NEXT_PUBLIC_*` dibutuhkan saat build karena sebagian dipakai oleh client
bundle. Jika nilai public berubah, rebuild image agar UI dan metadata konsisten.

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
  --build-arg NEXT_PUBLIC_SITE_URL=https://pdamcore.id \
  --build-arg NEXT_PUBLIC_APP_URL=https://app.pdamcore.id \
  --build-arg NEXT_PUBLIC_WHATSAPP_NUMBER=6289512728534 \
  --build-arg NEXT_PUBLIC_CONTACT_EMAIL=info@pdamcore.id \
  --build-arg NEXT_PUBLIC_ANALYTICS_ENABLED=false \
  --build-arg NEXT_PUBLIC_PLAUSIBLE_DOMAIN=pdamcore.id \
  -t pdamcore-marketing-web:latest .
```

Run image:

```bash
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://pdamcore.id \
  -e NEXT_PUBLIC_APP_URL=https://app.pdamcore.id \
  -e NEXT_PUBLIC_WHATSAPP_NUMBER=6289512728534 \
  -e NEXT_PUBLIC_CONTACT_EMAIL=info@pdamcore.id \
  pdamcore-marketing-web:latest
```

## Docker Compose

```bash
docker compose up -d --build
docker compose ps
curl -f http://127.0.0.1:3000/api/health
```

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
- Set webhook token hanya di secret manager atau environment server, bukan di repo.
- Verifikasi `/`, `/fitur`, `/solusi`, `/edukasi`, `/demo`, `/kontak`, `/privacy`.
- Verifikasi `/login` redirect ke `NEXT_PUBLIC_APP_URL`.
- Verifikasi `/sitemap.xml` dan `/robots.txt`.
- Verifikasi `/api/health` mengembalikan status `ok`.
- Aktifkan analytics hanya setelah domain dan consent internal siap.

## Rollback

- Simpan tag image per release, misalnya `pdamcore-marketing-web:2026-06-19-1`.
- Jika release gagal, redeploy tag image sebelumnya.
- Jangan mengubah secret atau webhook target saat rollback kecuali memang sumber masalahnya konfigurasi environment.
- Setelah rollback, cek `/api/health`, `/login`, form demo, form kontak, dan CTA WhatsApp.
