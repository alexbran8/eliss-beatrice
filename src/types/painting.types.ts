import { Locale } from "@/i18n/locales";

export type LocalizedString = Record<Locale, string>;

export type PaintingStatus = "available" | "reserved" | "sold" | "not-for-sale";

export type Painting = {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  year: number;
  series?: string;
  images: string[];
  dominantColours: Array<{
    name: string;
    hex: string;
  }>;
  materials: string[];
  surface: string;
  dimensions: {
    height: number;
    width: number;
    depth?: number;
    unit: "cm" | "in";
  };
  orientation: "portrait" | "landscape" | "square";
  framed: boolean;
  signed: boolean;
  status: PaintingStatus;
  price: {
    amount: number;
    currency: string;
  } | null;
  availabilityNote: LocalizedString;
  tags: string[];
};
