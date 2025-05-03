export function filterDigits(maxDigits: number, viewString: string): string {
  const filteredDigits = viewString.replace(/[^0-9]/g, '');
  return filteredDigits.slice(0, maxDigits);
}