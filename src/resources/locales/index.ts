import { defaultLocale, isLocale } from "@/i18n/locales";
import en from "./en.json";
import es from "./es.json";

export const localizedMetadata = {
  en,
  es,
};

export type LocalizedMetadata = typeof en;

export function getLocalizedMetadata(locale: string = defaultLocale): LocalizedMetadata {
  return localizedMetadata[isLocale(locale) ? locale : defaultLocale];
}
