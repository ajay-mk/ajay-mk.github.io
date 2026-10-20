import { writeFileSync, existsSync } from 'node:fs';
import { extractDois } from '../src/lib/orcid.ts';
import { normalizeCrossref } from '../src/lib/crossref.ts';
import { abstractFromInvertedIndex } from '../src/lib/openalex.ts';

const ORCID_ID = process.env.ORCID_ID || '0000-0002-0079-5443';
const OUT = new URL('../src/data/publications.json', import.meta.url);
const HEADERS = { Accept: 'application/json', 'User-Agent': 'ajay-mk.github.io (mailto:noreply@example.com)' };

async function main() {
  const orcidRes = await fetch(`https://pub.orcid.org/v3.0/${ORCID_ID}/works`, { headers: HEADERS });
  if (!orcidRes.ok) throw new Error(`ORCID ${orcidRes.status}`);
  const orcidJson = await orcidRes.json();
  const dois = extractDois(orcidJson);

  const pubs = [];
  for (const doi of dois) {
    try {
      const cr = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, { headers: HEADERS });
      if (!cr.ok) continue;
      const { message } = await cr.json();
      const pub = normalizeCrossref(message);
      // Some publishers (e.g. ACS) don't deposit abstracts with Crossref; OpenAlex often has them.
      if (!pub.abstract) {
        const oa = await fetch(`https://api.openalex.org/works/doi:${encodeURIComponent(doi)}?select=abstract_inverted_index`, { headers: HEADERS });
        if (oa.ok) {
          const abstract = abstractFromInvertedIndex((await oa.json()).abstract_inverted_index);
          if (abstract) pub.abstract = abstract;
        }
      }
      pubs.push(pub);
    } catch (e) {
      console.warn(`crossref miss for ${doi}: ${e.message}`);
    }
  }

  pubs.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  writeFileSync(OUT, JSON.stringify(pubs, null, 2) + '\n');
  console.log(`wrote ${pubs.length} publications`);
}

main().catch((err) => {
  console.warn(`publication fetch failed, keeping last-good cache: ${err.message}`);
  if (!existsSync(OUT)) writeFileSync(OUT, '[]\n');
  process.exit(0); // never fail the build
});
