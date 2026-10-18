# Snoozer Bot Central

The official website for the Snoozer Bot Central Yapper community.

- **Website:** https://truwty.github.io/Snoozer-Bot-Central/
- **Community:** https://yapper.website/invite/h4mQ4fJ6
- **Pages:** Home, status, docs, help, Terms, Privacy, and Cookies
- **Style:** Responsive monochrome editorial design with layered 3D details

This is a dependency-free static site. It uses local images, CSS, and JavaScript; no analytics, advertising, or external font/image services are included. The Terms, Privacy, and Cookies pages are operational drafts for review by Snoozer Bot Central's operator, not legal advice.

## Live bot status

The website can display the bot's version, online/offline state, server count, check time, and uptime when its public read-only status API is configured. The source URL in `assets/js/config.js` is intentionally blank by default, so the page says **Unable to verify** instead of guessing the bot is offline.

The bot's status listener binds to `127.0.0.1` over HTTP by default. To make it available to GitHub Pages, the operator must place it behind an HTTPS reverse proxy or secure tunnel, then set `window.SNOOZER_STATUS_API_URL` in `assets/js/config.js` to that HTTPS endpoint. Never publish the bot token or expose the listener directly over public plaintext HTTP.

## Deployment and source

The `Deploy Snoozer Bot Central` GitHub Actions workflow copies the HTML pages and `assets/` into the Pages artifact; it does not publish this README or any bot files. Changes pushed to `main` deploy automatically. The complete bot source remains in a separate private repository.

The canonical site source is maintained in the `website/` directory of the private bot repository, then synchronized here as a website-only copy. This repository can be previewed locally by serving its directory with any static file server.
