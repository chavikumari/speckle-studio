# Speckle Studios

Complete current portfolio website for Aliza & Chavi. Source and deployed web assets are preserved without design or behavior changes. Includes Home, Work, five case studies, About, Services, Contact, responsive layouts, animation, project galleries and the doodle playground.

## Stack and setup
Next.js 16.4.3 App Router, React 19.3.1, TypeScript, Tailwind CSS 4 and GSAP. Exact versions are pinned in package.json and pnpm-lock.yaml. Use Node.js 22 or newer (Node 24 LTS recommended) and pnpm 11.25.0.

```sh
npm install -g pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm dev
```
Open http://localhost:3000.

```sh
pnpm typecheck
pnpm build
python3 -m http.server 3000 --directory out
```
The build writes a static site to `out/`. The preserved `pnpm start` command uses next start and is **not applicable to static export**; use the static preview command above. No lint or test scripts are defined in the original project.

## Structure
See FILE_TREE.txt for the complete file tree and ASSETS.md for every asset. `app/` contains layouts, pages, metadata routes and CSS; `components/` contains shared UI, contact form, motion, home and portfolio components; `data/` contains content and intrinsic image dimensions; `public/` contains all runtime media, vectors, fonts and licenses. Framework and compiler configuration files remain at the root.

## Content and external services
No environment variables, database, API keys or backend server are required. `.env.example` documents this. Public configuration lives in `data/site.ts`.

The contact form submits through https://formsubmit.co/ajax/specklestudio7@gmail.com. **Delivery remains unactivated:** the studio must click Activate Form in the FormSubmit email before enquiries can be delivered. Actual inbox delivery has not been verified. The form retains entries and offers an email draft on failure. Visitors need internet access for this external service. Instagram links to https://www.instagram.com/speckle.studios/. The canonical URL and sitemap use the current production origin in data/site.ts; update this if moving domains and activate the new form origin if requested by FormSubmit.

All website imagery and font files are local. Outfit and Miss Fajardose are redistributed with their included SIL Open Font Licenses. Licensed Garet files were never provided: the current website already uses the supplied fallback, preserved here. Portfolio and inspiration imagery is supplied studio material; inclusion is not a grant of third-party copyright. Source design files and unused original uploads are not part of the runtime website.

## Deployment
Run `pnpm install --frozen-lockfile` then `pnpm build`. Deploy the contents of `out/` to any static host supporting directory index.html files (e.g. Netlify or Cloudflare Pages). Configure build command `pnpm build`, output directory `out`, and the Node version above. No server functions are required. Keep 404.html handling enabled. Hosting account identity `.openai/hosting.json` is intentionally excluded from this portable export; existing live deployment is unchanged.

## Upload to GitHub
Create an empty repository in GitHub, then from this folder:

```sh
git init
git add .
git commit -m "Import complete Speckle Studios website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```
Authenticate with GitHub's supported login flow. Do not add credentials to files. This package has no repository history, node_modules, build output, caches or hosting credentials. All source and public assets should be committed. Review AUDIT.md for exact validation and limitations.
