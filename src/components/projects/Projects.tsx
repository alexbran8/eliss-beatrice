import { getLocale } from "next-intl/server";
import { paintings, getLocalizedMetadata } from "@/resources";
import { ProjectsClient } from "./ProjectsClient";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export async function Projects({ range, exclude }: ProjectsProps) {
  const locale = await getLocale();
  const labels = getLocalizedMetadata(locale).paintings;

  let allPaintings = [...paintings].sort((a, b) => b.year - a.year);

  if (exclude && exclude.length > 0) {
    allPaintings = allPaintings.filter((painting) => !exclude.includes(painting.slug));
  }

  const displayedPaintings = range
    ? allPaintings.slice(range[0] - 1, range[1] ?? allPaintings.length)
    : allPaintings;

  return <ProjectsClient paintings={displayedPaintings} labels={labels} locale={locale} />;
}
