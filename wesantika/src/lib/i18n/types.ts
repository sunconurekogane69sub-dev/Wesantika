import type { en } from "./dictionaries/en";

/**
 * The English catalogue is declared `as const`, which makes every string a
 * literal type — useful for autocomplete, useless for translations. `Widen`
 * relaxes literals back to their primitives and drops `readonly`, producing the
 * shape every locale must satisfy.
 */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? Widen<U>[]
        : T extends object
          ? { -readonly [K in keyof T]: Widen<T[K]> }
          : T;

export type Dictionary = Widen<typeof en>;

/**
 * A partial catalogue. Objects merge key by key; arrays and strings are replaced
 * wholesale, so a translated list never ends up half English.
 */
export type PartialDictionary<T = Dictionary> = {
  [K in keyof T]?: T[K] extends readonly unknown[]
    ? T[K]
    : T[K] extends object
      ? PartialDictionary<T[K]>
      : T[K];
};
