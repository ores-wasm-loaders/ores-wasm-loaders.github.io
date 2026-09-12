# ores-wasm-loaders.github.io

Static Astro gateway for shared WASM loaders: packages, adoption, contract
authorities, and the limits of recorded test evidence.

## Verify the site

Use Node 22 and the committed npm lockfile:

```sh
npm ci
npx --no-install playwright install chromium
npm run build
npm test
zed validate --require-lock
```

Linux CI installs Chromium's system dependencies with
`npx --no-install playwright install --with-deps chromium`. Twelve browser checks
exercise the built site at 320px and 1440px: four page renders per viewport,
internal destinations and fragments, and keyboard skip/navigation behavior.
Screenshots are written under ignored `test-results/`. The browser harness owns
an Astro preview server on loopback port 4327 and rejects an existing server.
No external application or authentication environment variables are needed.

Both workflows check the exact PR head or pushed commit. The existing
flags-2-env inventory gate remains required. Site CI also checks package identity
parity and excludes generated files from the package preview.

## Evidence boundaries

The contract authorities live in
[owls-interfaces](https://github.com/ores-wasm-loaders/owls-interfaces), with
[TJSV](https://github.com/ORESoftware/typespec-json-schema-validator) as the
cross-runtime admission mechanism. This site defines no new wire contract and
does not replace owner admission or independent consumer tests.

The September 6 browser run linked on the site is historical evidence for its
recorded component set. The installation guide describes an isolated preview
registry: that does not prove current public registry access. On September 12,
the documented `owls-docs` v0.1.1 release endpoint returned 404 through the
configured GitHub connection; artifact availability must be checked before
adoption. The site build does not certify package publication, physical devices,
custom domains, authentication applications, field performance, or rollout.

Tracking: [site issue #1](https://github.com/ores-wasm-loaders/ores-wasm-loaders.github.io/issues/1)
and the [OWLS Linear project](https://linear.app/denman/project/ores-wasm-loaders-017f721fe577).
The site draft from PR #4 is retained in merge history alongside the current
governance and unchanged MIT terms.

## GitHub Pages publication

Pages must use **GitHub Actions** as its publishing source. The legacy branch
builder invokes Jekyll, which cannot compile Astro source. The Pages workflow
builds and tests the exact candidate before uploading only `dist/`. PRs exercise
the artifact build; deployment is limited to `main` and uses the existing
`github-pages` environment. Read-only build jobs do not receive Pages write or
OIDC permissions.

After a merge, verify the deployment run's source SHA and the served four routes
separately from the source checks. Custom domains and application sign-in
endpoints remain outside this library site's publication configuration.
