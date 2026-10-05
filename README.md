# Portfolio

## Local development

```sh
npm run dev
```

 From another device on the same
network, use `http://<this-computer-lan-ip>:3000` instead.

The production script binds to `0.0.0.0` (all IPv4 interfaces); development uses
Next.js's default all-interface binding. A listening address is not a public URL;
use localhost, the machine's IP address, or the hosting provider's public URL in
your browser.

`next.config.mjs` allows this computer's IPv4 addresses to load Next.js development
assets. Restart `npm run dev` after changing networks or IP addresses so the
allowlist refreshes.

## Production hosting

For a host that runs a Node.js server, use these commands:

| Setting | Value |
| --- | --- |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Start command | `npm start` |
| Listening address | `0.0.0.0` |
| Port | The host's `PORT` environment variable, or `3000` by default |

Next.js reads `PORT` directly from the process environment. Set it in the hosting
provider's environment settings when required; do not put it in a `.env` file,
because the HTTP server's port is selected before those files are loaded.
The scripts do not hard-code a port or override the host's assigned value.

To choose a port manually on any supported shell:

```sh
npm run build
npm start -- --port 8080
```

Use `npm start` for the public site. A managed Next.js platform may handle the
production server and port automatically using its framework preset.

Binding to `0.0.0.0` does not publish the site by itself. Deploy to a host with a
public HTTPS URL, or configure a domain and an HTTPS reverse proxy in front of
your own server. The public URL normally uses HTTPS port `443`; the Node.js
process uses its internal assigned port. The `allowedDevOrigins` setting is
only for development and does not restrict production domains.
