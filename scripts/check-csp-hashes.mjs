// Guards against the failure that took the whole site down once already:
// public/_headers pins a CSP script-src to exact sha256 hashes of Astro's
// inline hydration scripts. Upgrade Astro (or @astrojs/react) and those
// scripts change, the hashes stop matching, and every browser silently
// blocks ALL of them -- astro-island never registers, nothing hydrates,
// and the site renders as dead static HTML with frozen animations.
//
// Nothing catches that: the build succeeds, typecheck passes, and no error
// appears anywhere. It only shows up in a real browser against real headers.
// So: recompute the hashes from the built output and fail the build if
// _headers has drifted. A failed deploy is strictly better than a dead site.
//
// ponytail: regex over HTML rather than a real parser -- these are Astro's
// own generated <script> tags with a known, stable shape, not arbitrary
// user HTML. Swap in a parser only if this starts producing false hits.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const DIST = 'dist';
const HEADERS = 'public/_headers';

// Inline <script> only: skip anything with src= (hashes don't apply to those,
// they're covered by 'self') and skip JSON-LD (data, never executed).
const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g;

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? htmlFiles(join(dir, e.name)) : e.name.endsWith('.html') ? [join(dir, e.name)] : []
  );
}

const built = new Map(); // hash -> first file it appeared in
for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, 'utf8');
  for (const [, body] of html.matchAll(INLINE_SCRIPT)) {
    if (!body.trim()) continue;
    const hash = `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`;
    if (!built.has(hash)) built.set(hash, file);
  }
}

const headers = readFileSync(HEADERS, 'utf8');
const scriptSrc = headers.match(/script-src([^;]*);/)?.[1] ?? '';
const declared = new Set(scriptSrc.match(/'sha256-[A-Za-z0-9+/=]+'/g) ?? []);

const missing = [...built.keys()].filter((h) => !declared.has(h));
const stale = [...declared].filter((h) => !built.has(h));

if (missing.length) {
  console.error(`\n✗ CSP hash check FAILED — ${missing.length} inline script(s) in the build are not allowed by ${HEADERS}.`);
  console.error('  Deploying this would block them in the browser and break hydration site-wide.\n');
  for (const h of missing) console.error(`  missing: ${h}\n    first seen in: ${built.get(h)}`);
  console.error(`\n  Fix: set script-src in ${HEADERS} to exactly:\n`);
  console.error(`  script-src 'self' ${[...built.keys()].join(' ')}\n`);
  process.exit(1);
}

if (stale.length) {
  console.warn(`\n⚠ ${HEADERS} allows ${stale.length} hash(es) no longer present in the build (harmless, but worth pruning):`);
  for (const h of stale) console.warn(`  stale: ${h}`);
}

console.log(`✓ CSP hash check passed — ${built.size} inline script(s), all allowed by ${HEADERS}.`);
