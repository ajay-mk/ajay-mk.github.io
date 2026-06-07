import { describe, it, expect } from 'vitest';
import { extractDois } from '../src/lib/orcid';

const sample = {
  group: [
    { 'work-summary': [{ 'external-ids': { 'external-id': [
      { 'external-id-type': 'doi', 'external-id-value': '10.1002/wcms.1599' },
    ] } }] },
    { 'work-summary': [{ 'external-ids': { 'external-id': [
      { 'external-id-type': 'eid', 'external-id-value': '2-s2.0-x' },
      { 'external-id-type': 'doi', 'external-id-value': '10.1039/D1CP03637H' },
    ] } }] },
    { 'work-summary': [{ 'external-ids': { 'external-id': [] } }] }, // no doi -> skipped
  ],
};

describe('extractDois', () => {
  it('returns lowercased DOIs from each work group, skipping works without one', () => {
    expect(extractDois(sample)).toEqual(['10.1002/wcms.1599', '10.1039/d1cp03637h']);
  });
  it('returns [] for empty/malformed input', () => {
    expect(extractDois({})).toEqual([]);
    expect(extractDois({ group: [] })).toEqual([]);
  });
});
