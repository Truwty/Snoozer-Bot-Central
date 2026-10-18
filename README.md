# Snoozer Bot Central

The official website for the Snoozer Bot Central Yapper community.

- **Website:** https://truwty.github.io/Snoozer-Bot-Central/
- **Community:** https://yapper.website/invite/h4mQ4fJ6
- **Pages:** Home, status, docs, help, Terms, Privacy, and Cookies
- **Style:** Responsive monochrome editorial design with layered 3D details

This is a dependency-free static site. It uses local images, CSS, and JavaScript; no analytics, advertising, or external font/image services are included. The Terms, Privacy, and Cookies pages are operational drafts for review by Snoozer Bot Central's operator, not legal advice.

## Live bot status

The website displays the bot's version, online/offline state, server count, check time, and uptime using the public read-only status API configured in `assets/js/config.js`. This installation currently uses a Cloudflare Quick Tunnel, which has no uptime guarantee and is available only while the bot and tunnel run on the operator's PC. Its random URL can change after a restart; if that happens, update the URL in `assets/js/config.js` and republish. For stable long-term access, use a named tunnel with a domain you control.

The bot's status listener binds to `127.0.0.1` over HTTP by default. It is exposed through Cloudflare Tunnel HTTPS; the listener itself remains loopback-only. Never publish the bot token or expose the listener directly over public plaintext HTTP.

## Deployment and source

The `Deploy Snoozer Bot Central` GitHub Actions workflow copies the HTML pages and `assets/` into the Pages artifact; it does not publish this README or any bot files. Changes pushed to `main` deploy automatically. The complete bot source remains in a separate private repository.

The canonical site source is maintained in the `website/` directory of the private bot repository, then synchronized here as a website-only copy. This repository can be previewed locally by serving its directory with any static file server.
