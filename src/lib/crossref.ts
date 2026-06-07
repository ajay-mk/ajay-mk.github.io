import type { Publication } from './publications';

interface CrossrefAuthor { given?: string; family?: string; name?: string; }
interface CrossrefWork {
  title?: string[];
  author?: CrossrefAuthor[];
  'container-title'?: string[];
  published?: { 'date-parts'?: number[][] };
  DOI?: string;
  URL?: string;
}

// "Edward F." -> "E. F.", "Rotti Srinivasamurthy" -> "R. S."
function initials(given: string): string {
  return given
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((token) => `${token[0].toUpperCase()}.`)
    .join(' ');
}

function formatAuthor(a: CrossrefAuthor): string {
  if (a.given && a.family) return `${initials(a.given)} ${a.family}`;
  return a.family ?? a.name ?? '';
}

// Crossref titles/venues sometimes carry markup (e.g. <tt>) and stray newlines.
function clean(s: string): string {
  return s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export function normalizeCrossref(work: CrossrefWork): Publication {
  const year = work.published?.['date-parts']?.[0]?.[0] ?? null;
  return {
    title: clean(work.title?.[0] ?? 'Untitled'),
    authors: (work.author ?? []).map(formatAuthor).filter(Boolean),
    year,
    venue: clean(work['container-title']?.[0] ?? ''),
    doi: work.DOI ? work.DOI.toLowerCase() : null,
    url: work.URL ?? (work.DOI ? `https://doi.org/${work.DOI.toLowerCase()}` : null),
  };
}
