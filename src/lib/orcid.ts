interface ExternalId { 'external-id-type'?: string; 'external-id-value'?: string; }
interface WorkSummary { 'external-ids'?: { 'external-id'?: ExternalId[] }; }
interface OrcidWorks { group?: { 'work-summary'?: WorkSummary[] }[]; }

export function extractDois(json: OrcidWorks): string[] {
  const dois: string[] = [];
  for (const group of json.group ?? []) {
    const summary = group['work-summary']?.[0];
    const ids = summary?.['external-ids']?.['external-id'] ?? [];
    const doi = ids.find((id) => id['external-id-type']?.toLowerCase() === 'doi');
    if (doi?.['external-id-value']) dois.push(doi['external-id-value'].toLowerCase());
  }
  return dois;
}
