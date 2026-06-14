// Shared display helpers.

export function fmtDate(date: Date | undefined): string {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Whole days since the given date — used to nudge dormant projects forward.
export function daysSince(date: Date | undefined): number | undefined {
  if (!date) return undefined;
  const ms = Date.now() - date.getTime();
  return Math.max(0, Math.floor(ms / 86_400_000));
}
