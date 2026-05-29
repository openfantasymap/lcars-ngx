export type LcarsColor =
  | 'primary' | 'secondary' | 'tertiary' | 'accent' | 'muted'
  | 'danger' | 'warning' | 'success'
  | 'golden-tanoi' | 'periwinkle' | 'lilac' | 'hopbush'
  | 'pale-canary' | 'butterscotch' | 'tomato' | 'sunflower';

export type LcarsTheme =
  | 'tng' | 'picard' | 'ds9' | 'voyager'
  | 'klingon' | 'romulan' | 'cardassian' | 'ferengi';

export type LcarsStatus = 'nominal' | 'warning' | 'critical' | 'offline';

/** Join truthy class tokens. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** Coerce a number → "<n>rem"; pass strings through; null when absent. */
export function len(v?: string | number | null): string | null {
  if (v === undefined || v === null) return null;
  return typeof v === 'number' ? `${v}rem` : v;
}
