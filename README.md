# Ainsworth Farm Cattery

Website for Ainsworth Farm Cattery. Built with React, Vite and Tailwind, and hosted as a static site on Namecheap.

## Deploying

Every push to `main` builds the site and uploads it to Namecheap automatically (see `.github/workflows/deploy.yml`). You can also run it by hand from the repo's **Actions** tab → **Deploy to Namecheap** → **Run workflow**.

It needs these repo secrets (Settings → Secrets and variables → Actions):

- `FTP_SERVER` – the Namecheap FTP server
- `FTP_USERNAME` – the cPanel / FTP username
- `FTP_PASSWORD` – the cPanel / FTP password
- `FTP_DIR` – the folder this site's domain or subdomain points to, ending in `/` (check cPanel → Domains). Only the main domain uses `public_html/`.

## Building by hand

```
npm install
npm run dev      # local preview while editing
npm run build    # builds the site into dist/
```

Upload everything inside `dist/` (including the hidden `.htaccess`) to the site's folder.

## Contact form

The contact form posts to `contact.php`, which emails the message to Cats@ainsworthfarm.co.uk (change `$TO_EMAIL` in `client/public/contact.php` to send elsewhere). Replies go straight to the customer. If emails land in spam, set up SPF and DKIM in cPanel → Email Deliverability.

## Not included yet

The online availability calendar, booking requests and the admin page from the Replit version needed a database, so they've been taken out for now. They'll be rebuilt separately.
