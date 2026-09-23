export type ThemeKey =
  | "moss"
  | "sand"
  | "neutral-moss"
  | "warm-olive"
  | "charcoal-sage"
  | "warm-charcoal-amber";

export const THEMES: { key: ThemeKey; label: string }[] = [
  { key: "moss", label: "Moss" },
  { key: "sand", label: "Sand" },
  { key: "neutral-moss", label: "Neutral Moss" },
  { key: "warm-olive", label: "Warm Olive" },
  { key: "charcoal-sage", label: "Charcoal Sage" },
  { key: "warm-charcoal-amber", label: "Warm Amber" },
];

// Production default — read by app/layout.tsx to set the initial [data-theme].
export const THEME: ThemeKey = "charcoal-sage";
