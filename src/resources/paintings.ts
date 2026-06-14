import { defaultLocale, isLocale, Locale } from "@/i18n/locales";
import paintingsData from "./paintings.json";
import { Painting } from "@/types/painting.types";

export const paintings = paintingsData as Painting[];

export function getPaintingTitle(painting: Painting, locale: string = defaultLocale) {
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;
  return painting.title[safeLocale] || painting.title[defaultLocale];
}

export function getPaintingDescription(painting: Painting, locale: string = defaultLocale) {
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;
  return painting.description[safeLocale] || painting.description[defaultLocale];
}

export function getPaintingAvailabilityNote(painting: Painting, locale: string = defaultLocale) {
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;
  return painting.availabilityNote[safeLocale] || painting.availabilityNote[defaultLocale];
}

export function formatPaintingDimensions(painting: Painting) {
  const { height, width, depth, unit } = painting.dimensions;
  return [height, width, depth].filter(Boolean).join(" x ") + ` ${unit}`;
}

export function formatPaintingPrice(painting: Painting, locale: string = defaultLocale) {
  if (!painting.price) return null;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: painting.price.currency,
    maximumFractionDigits: 0,
  }).format(painting.price.amount);
}
