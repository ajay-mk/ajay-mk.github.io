import { describe, it, expect } from 'vitest';
import { normalizeCrossref } from '../src/lib/crossref';

const work = {
  title: ['In pursuit of accurate interlayer potentials for twisted bilayer graphynes'],
  author: [
    { given: 'Ajay', family: 'Melekamburath' },
    { given: 'Anto', family: 'James' },
    { family: 'Swathi' },
  ],
  'container-title': ['Physical Chemistry Chemical Physics'],
  published: { 'date-parts': [[2021, 11]] },
  DOI: '10.1039/d1cp03637h',
  URL: 'https://doi.org/10.1039/d1cp03637h',
};

describe('normalizeCrossref', () => {
  it('maps a Crossref work to a Publication with formatted authors', () => {
    expect(normalizeCrossref(work)).toEqual({
      title: 'In pursuit of accurate interlayer potentials for twisted bilayer graphynes',
      authors: ['A. Melekamburath', 'A. James', 'Swathi'],
      year: 2021,
      venue: 'Physical Chemistry Chemical Physics',
      doi: '10.1039/d1cp03637h',
      url: 'https://doi.org/10.1039/d1cp03637h',
    });
  });

  it('renders an initial for every given-name token (middle names included)', () => {
    const pub = normalizeCrossref({
      title: ['x'],
      author: [
        { given: 'Edward F.', family: 'Valeev' },
        { given: 'Rotti Srinivasamurthy', family: 'Swathi' },
      ],
      DOI: '10.x/y',
    });
    expect(pub.authors).toEqual(['E. F. Valeev', 'R. S. Swathi']);
  });

  it('strips HTML tags and collapses whitespace in title and venue', () => {
    const pub = normalizeCrossref({
      title: ['<tt>SeQuant</tt>\n                    framework for tensor algebra'],
      'container-title': ['J.  Chem.\nPhys.'],
      DOI: '10.1063/5.0311913',
    });
    expect(pub.title).toBe('SeQuant framework for tensor algebra');
    expect(pub.venue).toBe('J. Chem. Phys.');
  });

  it('handles missing fields without throwing', () => {
    const pub = normalizeCrossref({ DOI: '10.x/y' });
    expect(pub.title).toBe('Untitled');
    expect(pub.authors).toEqual([]);
    expect(pub.year).toBeNull();
    expect(pub.venue).toBe('');
  });
});
