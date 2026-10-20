// OpenAlex stores abstracts as { word: [positions] }; rebuild the plain text.
export function abstractFromInvertedIndex(idx: Record<string, number[]> | null | undefined): string | undefined {
  if (!idx) return undefined;
  const words: string[] = [];
  for (const [word, positions] of Object.entries(idx)) {
    for (const p of positions) words[p] = word;
  }
  // ACS pages put a figure caption before the abstract, which OpenAlex picks up.
  const text = words.filter(Boolean).join(' ').replace(/^High Resolution Image Download MS PowerPoint Slide\s*/, '');
  return text || undefined;
}
