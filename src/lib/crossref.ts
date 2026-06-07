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

function formatAuthor(a: CrossrefAuthor): string {
  if (a.given && a.family) return `${a.given[0]}. ${a.family}`;
  return a.family ?? a.name ?? '';
}

export function normalizeCrossref(work: CrossrefWork): Publication {
  const year = work.published?.['date-parts']?.[0]?.[0] ?? null;
  return {
    title: work.title?.[0] ?? 'Untitled',
    authors: (work.author ?? []).map(formatAuthor).filter(Boolean),
    year,
    venue: work['container-title']?.[0] ?? '',
    doi: work.DOI ? work.DOI.toLowerCase() : null,
    url: work.URL ?? (work.DOI ? `https://doi.org/${work.DOI.toLowerCase()}` : null),
  };
}
