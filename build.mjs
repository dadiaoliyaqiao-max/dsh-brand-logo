// Build client.js from client.template.js + logo.png.
// Usage: node build.mjs [logoHeightPx]   (default 72)
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const height = Number(process.argv[2] ?? 72);
if (!Number.isFinite(height) || height <= 0) throw new Error('logo height must be a positive number');

const b64 = readFileSync(join(dir, 'logo.png')).toString('base64');
const template = readFileSync(join(dir, 'client.template.js'), 'utf8');
if (!template.includes('__LOGO_B64__')) throw new Error('template placeholder __LOGO_B64__ missing');
const out = template.replace('__LOGO_B64__', b64).replaceAll('__LOGO_HEIGHT__', String(height));
writeFileSync(join(dir, 'client.js'), out, 'utf8');
console.log(`built client.js: ${out.length} bytes (logo ${b64.length} base64 chars, height ${height}px)`);
