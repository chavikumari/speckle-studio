# Export audit — 23 November 2026

- All app, component, data and public files compared byte-for-byte against the current source: no missing or changed runtime files.
- All 164 public asset files inventoried with byte sizes and SHA-256 in ASSETS.md; includes responsive variants, SVGs, photos, video, fonts and font licenses.
- Fresh project directory dependency installation: passed using pnpm install --frozen-lockfile. The machine's pnpm package cache was reused; this was not an isolated OS or empty-cache registry test.
- TypeScript check: passed. Imports and component references also checked by production compilation.
- Static generated HTML href/src/poster paths checked against exported files: 0 missing paths.
- Original package has no lint command or automated test suite; neither could be run. Existing browser verification covered responsive About/Work, contact choices, and all 50 gallery slides with correct aspect ratios and contain rendering. This export did not change runtime source.
- No temporary /Users or /var/folders paths found in runtime code. Media and fonts are locally included.
- External runtime dependency: FormSubmit. Email delivery is NOT activated or verified; mailbox activation is still required. Instagram is an outbound link, not a rendering dependency. No database or environment secrets are needed.
- No credentials or environment files were included. Hosting identity and Git history were excluded. This is not a forensic secret audit of third-party binary media.
- Next.js 16.4.3 raised a known-security-vulnerability advisory during the first build. Versions were preserved as requested; a security upgrade is recommended separately. The build's documented immediate retry was used. See final delivery for retry result.
- Garet webfonts were never supplied. The existing licensed Outfit fallback is included unchanged. Original design-tool documents and unused upload originals are outside the current runtime project; this archive contains the actual web assets used by the website.

Production build retry: PASSED, exit 0; all 14 static pages generated.
