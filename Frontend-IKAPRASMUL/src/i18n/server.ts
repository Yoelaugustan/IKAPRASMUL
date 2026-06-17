import "server-only";

import { cookies } from "next/headers";
import { DEFAULT_LANG, LANG_COOKIE, isLang, type Lang } from "./config";
import { dictionaries, type Dictionary } from "./dictionaries";

// Server-side language access. Reads the `lang` cookie (set by the client
// toggle) and returns the matching dictionary. Defaults to English.
export async function getLang(): Promise<Lang> {
  const store = await cookies();
  const value = store.get(LANG_COOKIE)?.value;
  return isLang(value) ? value : DEFAULT_LANG;
}

export function getDict(lang: Lang): Dictionary {
  return dictionaries[lang];
}

/** Convenience: resolve the current language and its dictionary in one call. */
export async function getServerDict(): Promise<{ lang: Lang; t: Dictionary }> {
  const lang = await getLang();
  return { lang, t: dictionaries[lang] };
}
