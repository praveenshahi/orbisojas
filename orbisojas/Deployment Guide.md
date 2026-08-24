# Deployment Guide

Full reference doc: `../vm-deploy-reference.md`

---

## Infrastructure

| | |
|---|---|
| **Domain** | orbisojas.com |
| **GCP Project** | amoris-495915 |
| **VM** | sitenew (e2-micro, us-central1-c) |
| **External IP** | 34.61.195.181 |
| **OS** | Ubuntu 22.04.5 LTS |
| **Web Server** | nginx 1.18.0 |
| **SSL** | certbot (auto-renew) |
| **Auth account** | amorisprana@gmail.com |
| **Site root** | /var/www/orbisojas |
| **File owner** | amorisprana:amorisprana |

## SSH Access

```bash
# Reliable SSH via IAP tunnel (always use this)
gcloud compute ssh sitenew --zone=us-central1-c --tunnel-through-iap --command="COMMAND"

# SCP upload
gcloud compute scp LOCAL_FILE sitenew:/tmp/FILENAME --zone=us-central1-c --tunnel-through-iap

# If tokens expired — user must run manually (Claude can't enter credentials)
gcloud auth login
```

## Server Directory Layout

```
/var/www/orbisojas/
  |-- index.html        <- Homepage (from website/home/)
  |-- his/              <- Boy's Journey (from website/template/)
  |   |-- index.html
  |   |-- css/
  |   |-- js/
  |   |-- img/
  |-- her/              <- Girl's Journey (from website/her/)
  |   |-- index.html
  |   |-- css/
  |   |-- js/
  |   |-- img/
  |-- begin.html        <- Mirror entry
  |-- css/              <- Homepage CSS
  |-- js/               <- Homepage JS
  |-- img/              <- Homepage images
```

## Deploy Workflow (update existing site)

### 1. Package locally (Git Bash)
```bash
cd "/c/Shahi backup/Amoris/admin/products/orbisojas"
tar -cf "/c/Shahi backup/site.tar" -C website/home .
# Or for a specific page:
tar -cf "/c/Shahi backup/his.tar" -C website/template .
tar -cf "/c/Shahi backup/her.tar" -C website/her .
```

### 2. Upload to VM
```bash
gcloud compute scp "C:\Shahi backup\site.tar" sitenew:/tmp/site.tar --zone=us-central1-c --tunnel-through-iap
```

### 3. Extract on server
```bash
gcloud compute ssh sitenew --zone=us-central1-c --tunnel-through-iap \
  --command="cd /var/www/orbisojas && sudo tar -xf /tmp/site.tar && sudo chown -R amorisprana:amorisprana /var/www/orbisojas"
```

### 4. Verify
```bash
gcloud compute ssh sitenew --zone=us-central1-c --tunnel-through-iap \
  --command="curl -s -o /dev/null -w '%{http_code}' https://orbisojas.com/"
```

## Nginx Configuration

Config file: `/etc/nginx/sites-available/orbisojas`

Key performance settings:
- **gzip:** on (text/css, application/javascript, image/svg+xml, etc.)
- **Image cache:** `expires 30d; Cache-Control: public, immutable`
- **CSS/JS cache:** `expires 7d; Cache-Control: public`
- **Font cache:** `expires 365d`

```bash
# Test config
gcloud compute ssh sitenew --zone=us-central1-c --tunnel-through-iap \
  --command="sudo nginx -t"

# Reload
gcloud compute ssh sitenew --zone=us-central1-c --tunnel-through-iap \
  --command="sudo systemctl reload nginx"
```

## SSL Certificate

Issued via certbot with nginx plugin. Auto-renews 30 days before expiry.

```bash
# Issue/renew for new domain
sudo certbot --nginx -d orbisojas.com -d www.orbisojas.com
```

## DNS

A records for `orbisojas.com` and `www.orbisojas.com` point to `34.61.195.181`.

## Other Sites on Same VM

| Site | Root | Domain |
|------|------|--------|
| Amoris Agency | /var/www/amoris | amoris.in |
| Portfolio | /var/www/praveen | praveenshahi.in |
| Course | /var/www/praveen/course | praveenshahi.in/course/ |

---

**Related:** [[Site Architecture]] | [[Tech Stack]]
