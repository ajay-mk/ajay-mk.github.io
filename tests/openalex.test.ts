import { describe, it, expect } from 'vitest';
import { abstractFromInvertedIndex } from '../src/lib/openalex';

describe('abstractFromInvertedIndex', () => {
  it('rebuilds the text by placing each word at its positions', () => {
    const idx = { The: [0], model: [1, 4], is: [2], a: [3] };
    expect(abstractFromInvertedIndex(idx)).toBe('The model is a model');
  });

  it('drops the figure-download text that ACS pages leak into the abstract', () => {
    const idx = { High: [0], Resolution: [1], Image: [2], Download: [3], MS: [4], PowerPoint: [5], Slide: [6], To: [7], follow: [8], up: [9] };
    expect(abstractFromInvertedIndex(idx)).toBe('To follow up');
  });

  it('returns undefined for a missing or empty index', () => {
    expect(abstractFromInvertedIndex(null)).toBeUndefined();
    expect(abstractFromInvertedIndex({})).toBeUndefined();
  });
});
