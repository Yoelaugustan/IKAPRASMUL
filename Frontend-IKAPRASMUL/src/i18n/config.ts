// Language config shared by server and client. Keep this tiny and dependency-free
// so it can be imported from anywhere (RSC, client components, middleware).

export const LANGS = ["en", "id"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "en";
export const LANG_COOKIE = "lang";

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}

export const LANG_LABELS: Record<Lang, string> = {
  en: "EN",
  id: "ID",
};
