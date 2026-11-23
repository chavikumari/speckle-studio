# Speckle Studios

Static website export matching the published Speckle Studios website.

## Hosting
Serve this directory directly with a static web server. No npm installation, build step, TypeScript, JSX, or Node.js server is required. Keep `_next`, routing `.txt` files, and all media/font files: the compiled JavaScript uses them for existing navigation and interactions. `.nojekyll` ensures GitHub Pages serves the `_next` directory. The existing custom domain is preserved in `CNAME`.

The JavaScript is the compiled browser bundle of the existing site (including its React runtime), not a rewritten vanilla JavaScript implementation. This keeps the appearance and behaviour unchanged.

## Contact form
Enquiries use FormSubmit and target specklestudio7@gmail.com. The mailbox owner must complete the one-time activation email before delivery works. Instagram: https://www.instagram.com/speckle.studios/

## Updates
HTML pages, CSS, JavaScript and assets are included. The previous framework source remains available in Git history. This export needs no build tooling to deploy.
